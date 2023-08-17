import React, { useEffect, useState } from "react";
import ChatLayout from "../../Layout/ChatRoomLayout";
import io from "socket.io-client";
import { GET_MESSAGES } from "../../gql/queries/getUserMessages";
import { STORE_MESSAGES } from "../../gql/mutations/storeUserMessages";
import client from "../../api/apiInstance";
import { useMutation } from "@apollo/client";
import parseDateToTimestamp from "../../utils/dateUtils";
import { GET_USERS } from "../../gql/queries/getAllUsers";
import ChatWindow from "./Modules/ChatWindow/ChatWindow";
import ChatList from "./Modules/ChatList/ChatList";
import { getMessagesBySenderAndRecipientId } from "../../gql/mutations/api/getMessagesBySenderAndRecipientId";
import { storeMessage } from "../../gql/mutations/api/storeMessages";
import socketCredentials from "../../helpers/socketCredentials";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Chat() {
  const user_details =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user_details"))
      : null;
  const selectedRecipient =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("selectedRecipient"))
      : null;
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [showChatContent, setShowChatContent] = useState(false);
  const [recipientId, setRecipientId] = useState(
    selectedRecipient?.id ? selectedRecipient?.id : null
  );
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState(
    selectedRecipient ? selectedRecipient : null
  );

  //get Users List
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await client.query({
          query: GET_USERS,
          fetchPolicy: "network-only",
        });

        const users = data.getUsers.filter(
          (user) => user.id !== user_details?.id
        );
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  //get messages based on chat selected
  useEffect(() => {
    if (recipientId !== null) {
      getMessagesBySenderAndRecipientId(
        parseInt(`${user_details?.id}`, 10),
        parseInt(`${recipientId}`, 10)
      ).then(({ messages, loading }) => {
        setMessages([...messages]);
        setLoading(loading); // Set the loading state in your component
      });
    }
  }, [recipientId]);

  // socket connection
  useEffect(() => {
    const newSocket = io(process.env.BASE_URL, socketCredentials);
    setSocket(newSocket);
  }, []);

  // add and get online users
  useEffect(() => {
    if (socket !== null || "") {
      socket.emit("addNewUser", user_details?.id);
      socket.on("getOnlineUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [socket]);

  // send message
  useEffect(() => {
    if (socket !== null) {
      setMessages((prev) => [
        ...prev,
        {
          ...newMessage,
          dateTime: parseDateToTimestamp(newMessage.dateTime),
          recipientId: recipientId,
          senderId: user_details?.id,
          chatId: `${recipientId}_${user_details?.id}`,
        },
      ]);

      //send message
      socket.emit("sendMessage", {
        ...newMessage,
        recipientId: recipientId,
        senderId: user_details?.id,
        chatId: `${recipientId}_${user_details?.id}`,
      });

      socket.on("getOnlineUsers", (data) => {
        setOnlineUsers(data);
      });

      //store message in db
      storeMessage(
        parseInt(`${user_details?.id}`, 10),
        parseInt(`${recipientId}`, 10),
        `${recipientId}_${user_details?.id}`,
        newMessage.message,
        newMessage.dateTime
      );
    }
  }, [newMessage]);

  // receive message
  useEffect(() => {
    if (socket !== null) {
      socket.on("getMessage", (res) => {
        setMessages((prev) => [
          ...prev,
          {
            ...res,
            dateTime: parseDateToTimestamp(res.dateTime),
          },
        ]);
        // getMessagesBySenderAndRecipientId(user_details?.id, recipientId);
      });

      return () => {
        socket.off("getMessage");
      };
    }
  }, [socket]);

  if (socket !== null) {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }

  const emitMessage = (message) => {
    console.log(message);
    setNewMessage(message);
  };

  const getRecipient = (data, chatStatus) => {
    setRecipient(data);
    setRecipientId(data.id);
    setShowChatContent(chatStatus);
  };

  const chatExit = () => {
    setShowChatContent(false);
  };

  return (
    <ChatLayout
      showChatContentStatus={showChatContent}
      sidebarContent={
        <ChatList
          users={users}
          showChatContent={showChatContent}
          onlineUsers={onlineUsers}
          getRecipient={getRecipient}
        />
      }
      chatContent={
        <ChatWindow
          users={users}
          loading={loading}
          onlineUsers={onlineUsers}
          messages={messages}
          emitMessage={emitMessage}
          chatExit={chatExit}
          recipient={recipient}
        />
      }
    />
  );
}
