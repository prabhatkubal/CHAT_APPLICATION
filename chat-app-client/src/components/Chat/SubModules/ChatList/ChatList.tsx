import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Search from "../../../Common/Search";
import HamburgerMenuIcon from "../HamburgerIcon/HamburgerIcon";
import UserListItem from "../UserListItem/UserListItem";
import { useToggleTheme } from "../../../../theme/themeUtilis";
import apiInstance from "../../../../api/apiInstance";
import axios from "axios";
import client from "../../../../api/apiInstance";
import { GET_USERS } from "../../../../gql/queries/getAllUsers";


interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const TabContainer = styled.div`
  display: flex;
`;

const Tab = styled.div<TabProps>`
  padding: 0.4rem 0.5rem;
  background-color: ${(props) => (props.active ? "#f9f9f9" : "#f0f0f0")};
  color: ${(props) => (props.active ? "#000000" : "#888888")};
  font-weight: ${(props) => (props.active ? "400" : "400")};
  border: 1px solid #e0e0e0;
  border-bottom: ${(props) => (props.active ? "none" : "1px solid #e0e0e0")};
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  margin: 0;
  user-select: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  width: fit-content;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const EmptyContentTab = styled.div`
  flex-grow: 1;
  border-bottom: 1px solid #e0e0e0;
`;

const ChatListContainer = styled.div`
  padding: 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
`;

const ChatListControls = styled.div`
  display: flex;
  margin: 0.5rem 0.5rem 0rem 0.5rem;
`;

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
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

const ChatList = ({ onlineUsers, getRecipient, showChatContent }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // const [theme, setTheme] = useState(null);
  const { toggleTheme } = useToggleTheme();
  const [activeTab, setActiveTab] = useState("Chat"); // Initialize with the Chat tab
  const tabNames = ["Chat", "Group Chat", "Blind Chat"]; // Array of all tab names

  const user_details =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user_details"))
      : null;
  const isAuthorized =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("isAuthorised"))
      : null;
  const [users, setUsers] = useState<User[]>([]);

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // const handleToggleTheme = () => {
  //   // setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  //   toggleTheme()
  // };

  useEffect(() => {
    isAuthorized !== "true"
      ? router.push({
          pathname: "/chat",
        })
      : null;
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await client.query({ query: GET_USERS });

        const users = data.getUsers.filter(
          (user) => user.id !== user_details?.id
        );
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ChatListContainer>
      <ChatListControls>
        <HamburgerMenuIcon
          isOpen={isOpen}
          onClick={handleClick}
          onToggleTheme={toggleTheme}
          onOutsideClick={() => setIsOpen(false)}
        />
        &nbsp;&nbsp;
        <Search placeholder="Search" onChange={(e) => null} />
      </ChatListControls>
      <TabContainer>
        <Tab
          active={activeTab === "Chat"}
          onClick={() => handleTabClick("Chat")}
        >
          Chat
        </Tab>
        <Tab
          active={activeTab === "Group Chat"}
          onClick={() => handleTabClick("Group Chat")}
        >
          Group Chat
        </Tab>
        <Tab
          active={activeTab === "Blind Chat"}
          onClick={() => handleTabClick("Blind Chat")}
        >
          Blind Chat
        </Tab>
        <EmptyContentTab></EmptyContentTab>
        {/* Add more tabs as needed */}
      </TabContainer>
      {activeTab === "Chat" && (
        <ChatListItemContainer>
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
                user={{ id: item.id.toString(), name: item.name }}
                isOnline={onlineUsers?.some((user) => user?.id === item.id)}
              />
            </ChatListItem>
          ))}
        </ChatListItemContainer>
      )}
    </ChatListContainer>
  );
};

export default ChatList;
