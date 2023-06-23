import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../styles/variables";

const ChatLayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const ChatSidebar = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundalt};
  width: 100%;

  @media screen and ${device.tablet} {
    border-right: ${({ theme }) => theme.colors.borderRight};
    width: 20%;
    min-width: 280px;
  }
`;

const ChatContent = styled.div.attrs(
  (props: { showChatContent: boolean }) => props
)`
  background-color: ${({ theme }) => theme.colors.background};
  height: 100%;
  width: 100%;
  position: absolute;
  right: ${(props) => (props.showChatContent ? "0%" : "-100%")};

  @media screen and ${device.tablet} {
    flex: 1;
    position: revert;
  }
`;

interface ChatLayoutProps {
  sidebarContent: ReactNode;
  chatContent: ReactNode;
  showChatContentStatus: boolean;
}

function ChatLayout({
  sidebarContent,
  chatContent,
  showChatContentStatus,
}: ChatLayoutProps) {

  return (
    <ChatLayoutContainer>
      <ChatSidebar>{sidebarContent}</ChatSidebar>
      <ChatContent showChatContent={showChatContentStatus}>
        {chatContent}
      </ChatContent>
    </ChatLayoutContainer>
  );
}

export default ChatLayout;
