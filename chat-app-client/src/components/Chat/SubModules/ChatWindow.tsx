import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Search from "../../Common/Search";
import Button from "../../Common/Button";
import UserListItem from "./UserListItem";

const ChatWindowContainer = styled.div`
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0 5px 0 25px;
  position: relative;
  padding-bottom: 20px;
`;

const ChatHeaderContainer = styled.div`
  background: white;
  border-bottom: 1px solid #ebebeb;
  padding: 10px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ChatContentContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  padding-right: 10px;

  /* Custom scroll styles */
  ::-webkit-scrollbar {
    width: 4px; /* Width of the scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Track color */
  }

  ::-webkit-scrollbar-thumb {
    background: #888; /* Thumb color */
    border-radius: 4px; /* Rounded corners */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* Hover state color */
  }
`;

const ChatInputContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 25px 5px 15px;
  position: absolute;
  bottom: -5%;
  background: transparent;
`;

const ChatBubbleReceived = styled.div`
  width: max-content;
  height: 40px;
  background: white;
  border: 1px solid #e1dcdc;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 12px;
  margin-right: auto;
`;

const ChatBubbleSent = styled.div`
  width: max-content;
  height: 40px;
  background: #2a85ff;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 12px;
  margin-left: auto;
`;

const DateDivider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #8b8b8b;
`;

const DateText = styled.span`
  padding: 0 10px;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #e3dbdb;
`;

const DateDividerWithLine = ({ date }) => {
  return (
    <DateDivider>
      <Line />
      <DateText>{date}</DateText>
      <Line />
    </DateDivider>
  );
};

interface ChatWindowState {
  message: string;
}

interface MessageData {
  message: string;
  dateTime: Date;
}

interface Messages {
  messageid: string;
  senderid: string;
  recipientid: string;
  chatid: string;
  message: string;
  datetime: string;
}

interface ChatWindowProps {
  emitMessage: (data: MessageData) => void;
  messages: Messages[];
  onlineUsers: Array<any>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  emitMessage,
  messages,
  onlineUsers,
}) => {
  const [state, setState] = useState<ChatWindowState>({
    message: "",
  });

  const chatContentRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const user_details =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user_details"))
      : null;

  const handleMessageSend = () => {
    const data: MessageData = {
      message: state.message,
      dateTime: new Date(),
    };
    emitMessage(data);
    setState({ message: "" });
  };

  const groupMessagesByDate = () => {
    const groupedMessages: { [date: string]: Messages[] } = {};

    messages.forEach((message) => {
      const date = new Date(message.datetime).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      if (groupedMessages[date]) {
        groupedMessages[date].push(message);
      } else {
        groupedMessages[date] = [message];
      }
    });

    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate();
  let lastDisplayedDate = "";

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  const TodaysDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <ChatWindowContainer>
      <ChatHeaderContainer>
        <UserListItem
          user={{ id: "16", name: "prabhat" }}
          // isOnline={onlineUsers?.some((user) => user?.userId === "16")}
          isOnline={null}
        />
      </ChatHeaderContainer>
      <ChatContentContainer ref={chatContentRef}>
        {Object.keys(groupedMessages).map((date) => (
          <React.Fragment key={date}>
            {date !== "Invalid Date" ? (
              <DateDividerWithLine date={date} />
            ) : null}
            {groupedMessages[date].map((item, index) => (
              <React.Fragment key={index}>
                {item.recipientid === user_details?.id && (
                  <ChatBubbleReceived>{item.message}</ChatBubbleReceived>
                )}
                {item.senderid === user_details?.id && (
                  <ChatBubbleSent>{item.message}</ChatBubbleSent>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </ChatContentContainer>
      <ChatInputContainer>
        <Search
          value={state.message}
          placeholder="Search"
          onChange={(e) => setState({ message: e.target.value })}
          onKeyDown={state.message !== "" ? handleSearchKeyDown : null}
        />
        {/* <Button onClick={handleMessageSend}>➡️ Send</Button> */}
      </ChatInputContainer>
    </ChatWindowContainer>
  );
};

export default ChatWindow;
