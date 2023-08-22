import React from "react";
import styled from "styled-components";

interface ChatInforProps {
  visible: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  onCopyText: () => void;
  onDelete: () => void;
  onForward: () => void;
  onReply: () => void;
}

const ContextMenu = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.backgroundOffSet};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 4px;
  z-index: 999;
`;

const ContextMenuItem = styled.div`
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundalt};
  }
`;

const ChatInfo: React.FC<ChatInforProps> = ({
  visible,
  position,
  onClose,
  onCopyText,
  onDelete,
  onForward,
  onReply,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <></>
  );
};

export default ChatInfo;
