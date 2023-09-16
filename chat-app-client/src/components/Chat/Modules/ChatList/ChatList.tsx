import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Search from "../../../Common/Search";
import { useToggleTheme } from "../../../../theme/themeUtilis";
import apiInstance from "../../../../services/apiInstance";
import axios from "axios";
import client from "../../../../services/apiInstance";
import HamburgerMenuIcon from "../../SubModules/HamburgerIcon/HamburgerIcon";
import UserListItem from "../../SubModules/UserListItem/UserListItem";
import ChatListItems from "../ChatListItems/ChatListItems";

interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
}

const TabContainer = styled.div`
  display: flex;
`;

const Tab = styled.div<TabProps>`
  padding: 0.4rem 0.5rem;
  background-color: ${(props) =>
    props.active
      ? props.theme.tabs.tabActiveBgColor
      : props.theme.tabs.tabInActiveBgColor};
  color: ${(props) =>
    props.active
      ? props.theme.tabs.tabActiveColor
      : props.theme.tabs.tabInActiveColor};
  font-weight: ${(props) => (props.active ? "400" : "400")};
  border: ${({ theme }) => theme.tabs.tabBorder};
  border-bottom: ${(props) =>
    props.active
      ? props.theme.tabs.tabActiveBorderBtm
      : props.theme.tabs.tabInActiveBorderBtm};
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  margin: 0;
  user-select: none;
  transition: background-color 0.2s ease, color 0.2s ease;
  width: fit-content;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundalt};
  }
`;

const EmptyContentTab = styled.div`
  flex-grow: 1;
  border-bottom: ${({ theme }) => theme.tabs.tabBorder};
`;

const ChatListContainer = styled.div`
  padding: 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
`;

const ChatListControls = styled.div`
  display: flex;
  margin: 0.5rem 0.5rem 0rem 0.5rem;
  margin-bottom: 10px;
`;

const ChatList = ({ users, onlineUsers, getRecipient, showChatContent }) => {
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
        <Search
          borderRadius={true}
          placeholder="Search"
          onChange={(e) => null}
        />
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
        <ChatListItems
          activeTab={activeTab}
          users={users}
          onlineUsers={onlineUsers}
          getRecipient={getRecipient}
          showChatContent={showChatContent}
          user_details={user_details}
        />
      )}
    </ChatListContainer>
  );
};

export default ChatList;
