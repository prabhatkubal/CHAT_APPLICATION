import React, { useEffect, useState } from "react";
import ChatLayout from "../../Layout/ChatRoomLayout";
import ChatList from "./SubModules/ChatList";
import ChatWindow from "./SubModules/ChatWindow/ChatWindow";
import io from "socket.io-client";
import apiInstance from "../../api/apiInstance";

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
  const [recipient, setRecipient] = useState(
    selectedRecipient ? selectedRecipient : null
  );

  async function getMessagesBySenderAndRecipientId(senderId, recipientId) {
    try {
      const response = await apiInstance.get(
        `http://localhost:4000/messages/${senderId}/${recipientId}`
      );
      const data = response.data;

      if (data.success) {
        const messages = data.messages;
        // console.log("Retrieved messages:", messages);
        setMessages([...messages]);
        // Process the retrieved messages here
      } else {
        console.error("Failed to retrieve messages:", data.error);
      }
    } catch (error) {
      console.error("Error retrieving messages:", error);
    }
  }

  //get messages based on chat selected
  useEffect(() => {
    if (recipientId !== null) {
      getMessagesBySenderAndRecipientId(user_details?.id, recipientId);
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
      console.log(user_details?.id);
      socket.emit("addNewUser", user_details?.id);

      socket.on("getOnlineUsers", (data) => {
        setOnlineUsers(data);
        console.log(data);
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

      socket.on("getOnlineUsers", (data) => {
        setOnlineUsers(data);
      });

      socket.on("getMessage", (res) => {
        console.log(res);
        setMessages((prev) => [...prev, res]);
        // getMessagesBySenderAndRecipientId(user_details?.id, recipientId);
      });
      // Post message data to the "/messages" API
      apiInstance
        .post("http://localhost:4000/messages", {
          senderId: user_details?.id,
          recipientId,
          chatId: `${recipientId}_${user_details?.id}`,
          message: newMessage.message,
          dateTime: new Date().toISOString(),
        })
        .then((response) => {
          if (response.data.success) {
            // console.log("Message inserted successfully:", response.data);
            // getMessagesBySenderAndrecipientId(user_details?.id, recipientId);
          } else {
            console.error("Failed to insert message:", response.data.error);
          }
        })
        .catch((error) => {
          console.error("Failed to insert message:", error);
        });
    }
  }, [newMessage]);

  // receive message
  useEffect(() => {
    if (socket !== null) {
      socket.on("getMessage", (res) => {
        console.log(res);
        setMessages((prev) => [...prev, res]);
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
