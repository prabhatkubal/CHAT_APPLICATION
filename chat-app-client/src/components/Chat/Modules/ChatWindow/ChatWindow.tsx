import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Search from "../../../Common/Search";
import Button from "../../../Common/Button";
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
  ChatTimeText,
  ChatBubbleSent,
  DateDivider,
  DateText,
  Line,
  ContextMenu,
  ContextMenuItem,
} from "./Styled";
import UserListItem from "../../SubModules/UserListItem/UserListItem";
import ForwardList from "../../SubModules/ForwardList/ForwardList";
import ChatMessageOptions from "../../SubModules/ChatMessageOptions/ChatMessageOptions";
import DeleteMessage from "../../SubModules/DeleteMessage/DeleteMessage";

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
  users,
  emitMessage,
  messages,
  loading,
  chatExit,
  onlineUsers,
  recipient,
}) => {
  const [state, setState] = useState<ChatWindowState>({
    message: "",
  });

  const [optionedMessage, setOptionedMessage] = useState({
    messageId: "",
    chatId: "",
  });

  const [forwardListVisible, setForwardListVisible] = useState(false);

  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const [deletePopupVisibility, setDeletePopupVisibility] = useState(false);

  const [hydrated, setHydrated] = useState(false);

  const user_details =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user_details"))
    : null;

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Add an event listener to the window object to detect clicks
  // useEffect(() => {
  //   console.log("prabhat0");
  //   if (!contextMenuVisible) return;
  //   console.log("prabhat1");
  //   const handleClickOutside = (event) => {
  //     if (
  //       chatWindowRef.current &&
  //       !chatWindowRef.current.contains(event.target)
  //     ) {
  //       console.log("prabhat2");
  //       setContextMenuVisible(false);
  //     }
  //   };

  //   if (typeof window !== "undefined") {
  //     window.addEventListener("click", handleClickOutside);
  //   }

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("click", handleClickOutside);
  //     }
  //   };
  // }, [contextMenuVisible]);

  //to show forward list
  const handleForwardClick = () => {
    setContextMenuVisible(false);
    setForwardListVisible(true);
  };

  const handleCancel = () => {
    setForwardListVisible(false);
  };

  //to show options as a popup for a message
  const handleContextMenu = (e: React.MouseEvent, data, messageType) => {
    setOptionedMessage({
      messageId: data?.messageId,
      chatId: data?.chatId,
    });
    e.preventDefault();
    setContextMenuVisible(true);
    if (messageType === 0) {
      setContextMenuPosition({ top: e.clientY, left: e.clientX });
    }
    if (messageType === 1) {
      setContextMenuPosition({ top: e.clientY, left: e.clientX });
    }
    // Save the messageId in the state if needed
  };

  const handleContextMenuClose = () => {
    setContextMenuVisible(false);
  };

  const handleDeleteMessagePopup = () => {
    setContextMenuVisible(false);
    setDeletePopupVisibility(true);
  };

  const handleDeleteMessagePopupClose = () => {
    setDeletePopupVisibility(false);
  };

  const chatWindowRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  //send message on Enter Key
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSend = () => {
    const data: MessageData = {
      message: state.message,
      dateTime: new Date(),
    };
    emitMessage(data);
    setState({ message: "" });
  };

  const groupedMessages = groupMessagesByDate(messages);

  // const TodaysDate = new Date().toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "numeric",
  //   year: "numeric",
  // });

  // Object.keys(groupedMessages).map((date) => {
  //   groupedMessages[date].map((item, index) => {
  //     console.log({
  //       date: date,
  //       time: item?.time,
  //       typeof: typeof item?.recipientId,
  //       recipientId: item?.recipientId,
  //       senderId: item?.senderId,
  //       userId: user_details?.id,
  //       message: item?.message,
  //     });
  //   });
  // });

  // console.log(messages);

  return (
    <ChatWindowContainer ref={chatWindowRef}>
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
            isCheckbox={false}
          />
        )}
      </ChatHeaderContainer>
      {loading === false ? (
        <ChatContentContainer ref={chatContentRef}>
          {Object.keys(groupedMessages).map((date) => (
            <React.Fragment key={date}>
              {date !== "Invalid Date" ? (
                <DateDividerWithLine date={date} />
              ) : null}
              {groupedMessages[date].map((item, index) => (
                <React.Fragment key={index}>
                  {item.recipientId == user_details?.id && (
                    <div onContextMenu={(e) => handleContextMenu(e, item, 0)}>
                      <ChatBubbleReceived>
                        {item.message}
                        <ChatTimeText>{item.time}</ChatTimeText>
                      </ChatBubbleReceived>
                    </div>
                  )}
                  {item.senderId == user_details?.id && (
                    <div onContextMenu={(e) => handleContextMenu(e, item, 1)}>
                      <ChatBubbleSent>
                        {item.message}
                        <ChatTimeText>{item.time}</ChatTimeText>
                      </ChatBubbleSent>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
          <ChatMessageOptions
            visible={contextMenuVisible}
            position={contextMenuPosition}
            onClose={handleContextMenuClose}
            onCopyText={handleContextMenuClose}
            onDelete={handleDeleteMessagePopup}
            onForward={handleForwardClick}
            onReply={handleContextMenuClose}
          />
          <DeleteMessage
            MessageInfo={optionedMessage}
            popupVisible={deletePopupVisibility}
            onCancel={handleDeleteMessagePopupClose}
            onConfirm={() => setDeletePopupVisibility(false)}
          />
        </ChatContentContainer>
      ) : null}
      <ChatInputContainer>
        <Search
          value={state.message}
          placeholder="Search"
          onChange={(e) => {
            setState({ message: e.target.value });
          }}
          onKeyDown={state.message !== "" ? handleSearchKeyDown : null}
        />
        {/* <Button onClick={handleMessageSend}>➡️ Send</Button> */}
      </ChatInputContainer>
      {forwardListVisible && (
        <ForwardList users={users} onCancel={handleCancel} />
      )}
    </ChatWindowContainer>
  );
};

export default ChatWindow;
