import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Search from "../../../Common/Search";
import Button from "../../../Common/Button";
import UserListItem from "../UserListItem";
import { BiLeftArrowAlt } from "react-icons/bi";
import { groupMessagesByDate } from "../../../../utils/dateUtils";
import {
  ChatWindowProps,
  ChatWindowState,
  Messages,
  MessageData,
  Recipient,
} from "./interfaces";
import {
  ChatWindowContainer,
  ChatHeaderContainer,
  ChatContentContainer,
  ChatInputContainer,
  ChatBubbleReceived,
  ChatBubbleSent,
  DateDivider,
  DateText,
  Line,
} from "./Styled";

const DateDividerWithLine = ({ date }) => {
  return (
    <DateDivider>
      <Line />
      <DateText>{date}</DateText>
      <Line />
    </DateDivider>
  );
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  emitMessage,
  messages,
  chatExit,
  onlineUsers,
  recipient,
}) => {
  const [state, setState] = useState<ChatWindowState>({
    message: "",
  });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const chatContentRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessageSend();
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

  const groupedMessages = groupMessagesByDate(messages);
  let lastDisplayedDate = "";

  // const TodaysDate = new Date().toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  // });

  Object.keys(groupedMessages).map((date) => {
    groupedMessages[date].map((item, index) => {
      console.log(
        item.recipientId !== user_details?.id,
        item.senderId === user_details?.id
      );
    });
  });

  return (
    <ChatWindowContainer>
      <ChatHeaderContainer>
        <BiLeftArrowAlt
          onClick={chatExit}
          style={{ cursor: "pointer" }}
          size={28}
        />
        {hydrated && (
          <UserListItem
            user={{ id: recipient?.id.toString(), name: recipient?.name }}
            // isOnline={onlineUsers?.some((user) => user?.userId === "16")}
            isOnline={null}
          />
        )}
      </ChatHeaderContainer>
      <ChatContentContainer ref={chatContentRef}>
        {Object.keys(groupedMessages).map((date) => (
          <React.Fragment key={date}>
            {date !== "Invalid Date" ? (
              <DateDividerWithLine date={date} />
            ) : null}
            {groupedMessages[date].map((item, index) => (
              <React.Fragment key={index}>
                {item.recipientId === user_details?.id && (
                  <ChatBubbleReceived>{item.message}</ChatBubbleReceived>
                )}
                {item.senderId === user_details?.id && (
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
