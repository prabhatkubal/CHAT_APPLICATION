import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import Search from "../../Common/Search";
import HamburgerMenuIcon from "./HamburgerIcon";
import UserListItem from "./UserListItem";
import { useToggleTheme } from "../../../theme/themeUtilis";

const ChatListContainer = styled.div`
  padding: 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
`;

const ChatListControls = styled.div`
  display: flex;
  margin: 0.5rem 0.5rem;
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
`;

interface User {
  id: number;
  name: string;
  email: string;
}

const ChatList = ({ onlineUsers, getRecipient }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // const [theme, setTheme] = useState(null);
  const { toggleTheme } = useToggleTheme();

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
        const response = await axios.get("http://localhost:4000/users");

        if (response.status === 200) {
          setUsers(
            response.data.users.filter((user) => user.id !== user_details?.id)
          );
        } else {
          console.error("Failed to fetch users:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ChatListContainer>
      <ChatListControls>
        <HamburgerMenuIcon
          isOpen={isOpen}
          onClick={handleClick}
          onToggleTheme={toggleTheme}
          onOutsideClick={() => setIsOpen(false)}
        />
        &nbsp;
        <Search placeholder="Search" onChange={(e) => null} />
      </ChatListControls>
      <ChatListItemContainer>
        {users.map((item, index) => (
          <ChatListItem
            key={index}
            onClick={() => {
              localStorage.setItem(
                "currentChatId",
                `${item.id}_${user_details?.id}`
              );
              localStorage.setItem("selectedRecipientId", `${item.id}`);
              getRecipient(item.id);
            }}
          >
            <UserListItem
              user={{ id: item.id.toString(), name: item.name }}
              isOnline={onlineUsers?.some((user) => user?.userId === item.id)}
            />
          </ChatListItem>
        ))}
      </ChatListItemContainer>
    </ChatListContainer>
  );
};

export default ChatList;
