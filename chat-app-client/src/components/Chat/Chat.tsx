import React, { useEffect, useState } from "react";
import ChatLayout from "../../Layout/ChatRoomLayout";
import ChatList from "./SubModules/ChatList/ChatList";
import ChatWindow from "./SubModules/ChatWindow/ChatWindow";
import io from "socket.io-client";
import { GET_MESSAGES } from "../../gql/queries/getUserMessages";
import { STORE_MESSAGES } from "../../gql/mutations/storeUserMessages";
import client from "../../api/apiInstance";
import { useMutation } from "@apollo/client";

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
  const [storeMessages, { loading: storeLoading, error: storeError }] =
    useMutation(STORE_MESSAGES);

  async function getMessagesBySenderAndRecipientId(senderId, recipientId) {
    try {
      setLoading(true);

      const { data, error } = await client.query({
        query: GET_MESSAGES,
        variables: {
          senderId,
          recipientId,
        },
        fetchPolicy: "network-only",
      });

      if (error) {
        console.error("Error retrieving messages:", error);
        return;
      }

      const messages = data.getMessages;

      setMessages([...messages]);
      setLoading(false);
      // Process the retrieved messages here
    } catch (error) {
      console.error("Error retrieving messages:", error);
      setLoading(false);
    }
  }

  //get messages based on chat selected
  useEffect(() => {
    if (recipientId !== null) {
      getMessagesBySenderAndRecipientId(
        parseInt(`${user_details?.id}`, 10),
        parseInt(`${recipientId}`, 10)
      );
    }
  }, [recipientId]);

  // socket connection
  useEffect(() => {
    const newSocket = io(process.env.BASE_URL, {
      reconnection: false,
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });
    setSocket(newSocket);
  }, []);

  // add online users
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
          recipientId: recipientId,
          senderId: user_details?.id,
          chatId: `${recipientId}_${user_details?.id}`,
        },
      ]);

      socket.emit("sendMessage", {
        ...newMessage,
        recipientId: recipientId,
        senderId: user_details?.id,
        chatId: `${recipientId}_${user_details?.id}`,
      });

      console.log("sentMessage", {
        ...newMessage,
        recipientId: recipientId,
        senderId: user_details?.id,
        chatId: `${recipientId}_${user_details?.id}`,
      });

      socket.on("getOnlineUsers", (data) => {
        setOnlineUsers(data);
      });

      // socket.on("getMessage", (res) => {
      //   setMessages((prev) => [...prev, res]);
      //   // getMessagesBySenderAndRecipientId(user_details?.id, recipientId);
      // });
      // Post message data to the "/messages" API
      storeMessages({
        variables: {
          senderId: parseInt(`${user_details?.id}`, 10),
          recipientId: parseInt(`${recipientId}`, 10),
          chatId: `${recipientId}_${user_details?.id}`,
          message: newMessage.message,
          dateTime: newMessage.dateTime,
        },
      })
        .then((response) => {
          const data = response.data.storeMessages;
          if (data.success) {
            // Message inserted successfully
            const insertedMessage = data.insertedMessage;
            client.clearStore();
          } else {
            // Handle the error response
            console.error("Failed to insert message:", data.message);
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error("Failed to insert message:", error);
        });
    }
  }, [newMessage]);

  // receive message
  useEffect(() => {
    if (socket !== null) {
      socket.on("getMessage", (res) => {
        setMessages((prev) => [...prev, res]);
        console.log("gotMessage", res); 
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
          showChatContent={showChatContent}
          onlineUsers={onlineUsers}
          getRecipient={getRecipient}
        />
      }
      chatContent={
        <ChatWindow
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
