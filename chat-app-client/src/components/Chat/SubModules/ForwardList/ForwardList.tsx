import React, { useState } from "react";
import styled from "styled-components";
import Search from "../../../Common/Search";
import UserListItem from "../../SubModules/UserListItem/UserListItem";

const PopupContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  width: 300px;
`;

const CloseButton = styled.div`
  text-align: right;
  cursor: pointer;
`;

const ForwardListItemContainer = styled.div`
  margin-bottom: 10px;
  height: 55px;
  background: transparent;
  padding: 8px 0px;
`;

const ForwardList = ({ users, onCancel }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PopupContainer>
      <PopupContent>
        <CloseButton onClick={onCancel}>X</CloseButton>
        <Search
          borderRadius={true}
          value={searchQuery}
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {users.map((user) => (
          <ForwardListItemContainer>
            <UserListItem
              key={user.id}
              user={{
                id: user.id.toString(),
                firstname: user.name,
                lastname: user.lastname,
              }}
              // Add checkbox and handle its state here
              userIconSize={"sm"}
              userNameFont={"sm"}
              isOnline={false} // Modify based on user's online status
              isCheckbox={true}
            />
          </ForwardListItemContainer>
        ))}
      </PopupContent>
    </PopupContainer>
  );
};

export default ForwardList;
