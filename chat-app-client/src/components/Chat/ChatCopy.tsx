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
  const [recipientid, setRecipientid] = useState(
    selectedRecipient?.id ? selectedRecipient?.id : null
  );
  const [recipient, setRecipient] = useState(
    selectedRecipient ? selectedRecipient : null
  );

  async function getMessagesBySenderAndRecipientid(senderid, recipientid) {
    try {
      const response = await apiInstance.get(
        `http://localhost:4000/messages/${senderid}/${recipientid}`
      );
      const data = response.data;

      if (data.success) {
        const messages = data.messages;
        console.log("Retrieved messages:", messages);
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
    if (recipientid !== null) {
      getMessagesBySenderAndRecipientid(user_details?.id, recipientid);
    }
  }, [recipientid]);

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
    if (socket !== null) {
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
          recipientid: recipientid,
          senderid: user_details?.id,
          chatid: `${recipientid}_${user_details?.id}`,
        },
      ]);

      socket.emit("sendMessage", {
        ...newMessage,
        recipientid: recipientid,
        senderid: user_details?.id,
        chatid: `${recipientid}_${user_details?.id}`,
      });

      socket.on("getOnlineUsers", (data) => {
        setOnlineUsers(data);
      });
      // Post message data to the "/messages" API
      apiInstance
        .post("http://localhost:4000/messages", {
          senderid: user_details?.id,
          recipientid,
          chatid: `${recipientid}_${user_details?.id}`,
          message: newMessage.message,
          dateTime: new Date().toISOString(),
        })
        .then((response) => {
          if (response.data.success) {
            // console.log("Message inserted successfully:", response.data);
            // getMessagesBySenderAndRecipientid(user_details?.id, recipientid);
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
        // getMessagesBySenderAndRecipientid(user_details?.id, recipientid);
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
    setRecipientid(data.id);
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