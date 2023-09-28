import React from "react";
import styled from "styled-components";
import { capitalizeFirstLetter } from "../../../../utils/capitalizeFirstLetter";

interface User {
  id: string;
  firstname: string;
  lastname: string;
}

interface UserListItemProps {
  user: User;
  userIconSize: string;
  userNameFont: string;
  isOnline: boolean;
  isCheckbox: boolean;
}

const UserListItemContainer = styled.div`
  display: flex;
  width: 100%;
`;

const UserIcon = styled.div<{ userIconSize: string }>`
  margin: 0;
  background: linear-gradient(91deg, #579aca, #2d538e);
  height: ${({ userIconSize }) => (userIconSize === "sm" ? "40px" : "70px")};
  width: ${({ userIconSize }) => (userIconSize === "sm" ? "40px" : "70px")};
  font-size: ${({ userIconSize }) =>
    userIconSize === "sm" ? "initial" : "40px"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 4px;
  border-radius: 50%;
  margin-right: 5px;
  color: white;
`;

const UserName = styled.div<{ userNameFont: string }>`
  font-size: ${({ userNameFont }) =>
    userNameFont === "sm" ? "initial" : "25px"};
`;

const Checkbox = styled.input`
  margin-left: auto;
  margin-bottom: 20px;
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

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  isOnline,
  isCheckbox = false,
  userIconSize = "sm",
  userNameFont = "sm",
}) => {
  // const selectedUser =
  //   typeof window !== "undefined"
  //     ? JSON.parse(localStorage.getItem("selectedUser"))
  //     : null;

  console.log(user);

  return (
    <UserListItemContainer>
      <UserIcon userIconSize={userIconSize}>
        {user?.firstname?.charAt(0)?.toUpperCase()}
        {user?.lastname?.charAt(0)?.toUpperCase()}
      </UserIcon>
      <UserName userNameFont={userNameFont}>
        {capitalizeFirstLetter(user?.firstname)}{" "}
        {capitalizeFirstLetter(user?.lastname)}
      </UserName>
      {isCheckbox && <Checkbox type="checkbox" />}
      {/* <LastOnline>Last Online Recently</LastOnline> */}
      <OnlineIdentifier isOnline={isOnline} />
      {/* Render the content for each user list item */}
    </UserListItemContainer>
  );
};

export default UserListItem;
