import React from "react";
import styled from "styled-components";
import UserListItem from "../../SubModules/UserListItem/UserListItem";

const ChatListItem = styled.div`
  position: relative;
  margin-bottom: 10px;
  height: 55px;
  background: transparent;
  padding: 8px 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
`;

const ChatListItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  overflow-y: scroll;
  height: 80vh;
`;

const ChatListItems = ({
  users,
  onlineUsers,
  getRecipient,
  showChatContent,
  user_details,
  activeTab,
}) => {
  return (
    <ChatListItemContainer>
      {activeTab === "Group Chat" ? (
        <ChatListItemContainer>Group Chat</ChatListItemContainer>
      ) : null}
      <React.Fragment></React.Fragment>
      {users.map((item, index) => (
        <ChatListItem
          key={index}
          onClick={() => {
            localStorage.setItem(
              "currentChatId",
              `${item.id}_${user_details?.id}`
            );
            localStorage.setItem("selectedRecipient", JSON.stringify(item));
            getRecipient(item, !showChatContent);
          }}
        >
          <UserListItem
            user={{ id: item.id.toString(), firstname: item.firstname, lastname: item.lastname }}
            userIconSize={"sm"}
            userNameFont={"sm"}
            isOnline={onlineUsers?.some((user) => user?.id === item.id)}
            isCheckbox={false}
          />
        </ChatListItem>
      ))}
    </ChatListItemContainer>
  );
};

export default ChatListItems;
