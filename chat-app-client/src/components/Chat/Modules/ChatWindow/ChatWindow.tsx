import React, { useState, useRef, useEffect } from "react";
import Search from "../../../Common/Search";
import Button from "../../../Common/Button";
import { groupMessagesByDate } from "../../../../utils/dateUtils";
import {
  ChatWindowProps,
  ChatWindowState,
  Messages,
  MessageData,
  Recipient,
} from "./Interface";
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
import { BackArrow } from "../../../../constants/Icons/Icons";
import { user_details } from "../../../../utils/getUserDetails";

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
  updateMesssages,
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
    console.log(data);
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

  function deleteAndUpdateMessages(messages, chatId, messageId) {
    const updatedMessages = messages.filter((message) => {
      return !(message.chatId === chatId && message.messageId === messageId);
    });

    return updatedMessages;
  }

  return (
    <ChatWindowContainer ref={chatWindowRef}>
      <ChatHeaderContainer>
        <BackArrow
          onClick={chatExit}
          style={{ cursor: "pointer" }}
          size={28}
        />
        {hydrated && (
          <UserListItem
            user={{ id: recipient?.id.toString(), name: recipient?.name }}
            // isOnline={onlineUsers?.some((user) => user?.userId === "16")}
            userIconSize={"sm"}
            userNameFont={"sm"}
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
                    <ChatBubbleReceived
                      onContextMenu={(e) => handleContextMenu(e, item, 0)}
                    >
                      {item.message}
                      <ChatTimeText>{item.time}</ChatTimeText>
                    </ChatBubbleReceived>
                  )}
                  {item.senderId == user_details?.id && (
                    <ChatBubbleSent
                      onContextMenu={(e) => handleContextMenu(e, item, 1)}
                    >
                      {item.message}
                      <ChatTimeText>{item.time}</ChatTimeText>
                    </ChatBubbleSent>
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
            onConfirm={(MessageInfo) => {
              const updatedMessages = deleteAndUpdateMessages(
                messages,
                MessageInfo.chatId,
                MessageInfo.messageId
              );
              updateMesssages(updatedMessages);
              setDeletePopupVisibility(false);
            }}
          />
        </ChatContentContainer>
      ) : null}
      <ChatInputContainer>
        <Search
          borderRadius={false}
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
