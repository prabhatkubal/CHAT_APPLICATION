import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Search from "../../../Common/Search";
import { useToggleTheme } from "../../../../theme/themeUtilis";
import apiInstance from "../../../../services/apiInstance";
import axios from "axios";
import client from "../../../../services/apiInstance";
import HamburgerMenuIcon from "../../SubModules/HamburgerIcon/HamburgerIcon";
import UserListItem from "../../SubModules/UserListItem/UserListItem";
import ChatListItems from "../ChatListItems/ChatListItems";
import { Chat } from "../../../../constants/paths";
import { user_details } from "../../../../utils/getUserDetails";
import {
  ChatListContainer,
  ChatListControls,
  EmptyContentTab,
  Tab,
  TabContainer,
} from "./Styled";

const ChatList = ({ users, onlineUsers, getRecipient, showChatContent }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // const [theme, setTheme] = useState(null);
  const { toggleTheme } = useToggleTheme();
  const [activeTab, setActiveTab] = useState("Chat"); // Initialize with the Chat tab
  const tabNames = ["Chat", "Group Chat", "Blind Chat"]; // Array of all tab names
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
          pathname: Chat,
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
