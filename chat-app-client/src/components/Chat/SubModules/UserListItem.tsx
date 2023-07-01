import React from "react";
import styled from "styled-components";

interface User {
  id: string;
  name: string;
}

interface UserListItemProps {
  user: User;
  isOnline: boolean;
}

const UserListItemContainer = styled.div`
  display: flex;
`;

const UserIcon = styled.div`
  margin: 0;
  background: linear-gradient(91deg, #579aca, #2d538e);
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;
  border-radius: 50%;
  margin-right: 5px;
  color: white;
`;

const UserName = styled.div`
  /* Add your styling for the user name */
`;

const LastOnline = styled.div`
  display: block;
`;

const OnlineIdentifier = styled.div<{ isOnline: boolean }>`
  display: ${({ isOnline }) => (isOnline ? "block" : "none")};
  background: lawngreen;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  position: absolute;
  right: 2%;
  top: 10%;
`;

const UserListItem: React.FC<UserListItemProps> = ({ user, isOnline }) => {
  
  // const selectedUser =
  //   typeof window !== "undefined"
  //     ? JSON.parse(localStorage.getItem("selectedUser"))
  //     : null;

  return (
    <UserListItemContainer>
      <UserIcon>{user?.name?.charAt(0)?.toUpperCase()}</UserIcon>
      <UserName>{user?.name}</UserName>
      {/* <LastOnline>Last Online Recently</LastOnline> */}
      <OnlineIdentifier isOnline={isOnline} />
      {/* Render the content for each user list item */}
    </UserListItemContainer>
  );
};

export default UserListItem;
