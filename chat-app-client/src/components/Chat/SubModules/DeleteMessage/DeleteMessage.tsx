import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../Common/Button";
import { useMutation } from "@apollo/client";
import { DELETE_MESSAGE } from "../../../../gql/mutations/messages/deleteMessage";
import client from "../../../../services/apiInstance";

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid gray;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.backgroundOffSet};
  z-index: 1000;
  border-radius: 12px;
`;

const Message = styled.p`
  margin-bottom: 10px;
  margin-top: 0px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
  width: 100%;

`;

interface MessageInfo {
  messageId: string;
  chatId: string;
}

interface DeletMessagePopupProps {
  popupVisible: boolean;
  MessageInfo: MessageInfo;
  onCancel: () => void;
  onConfirm: (MessageInfo: MessageInfo) => void;
}

const DeleteMessage: React.FC<DeletMessagePopupProps> = ({
  popupVisible,
  onCancel,
  onConfirm,
  MessageInfo,
}) => {
  if (!popupVisible) {
    return null;
  }

  const [deleteMessageMutation] = useMutation(DELETE_MESSAGE);

  const handleConfirm = () => {
    console.log(MessageInfo);
    handleDeleteMessage(MessageInfo.messageId, MessageInfo.chatId);
    onConfirm(MessageInfo);
  };

  const handleDeleteMessage = async (messageId, chatId) => {
    try {
      const { data } = await client.mutate({
        mutation: DELETE_MESSAGE,
        variables: {
          messageId: messageId,
          chatId: chatId,
        },
      });

      if (data.deleteMessage.success) {
        console.log("Message deleted successfully");
      } else {
        console.error("Failed to delete message:", data.deleteMessage.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <PopupContainer>
      <Message>Are you sure you want to delete this message?</Message>
      <ButtonContainer>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleConfirm}>OK</Button>
      </ButtonContainer>
    </PopupContainer>
  );
};

export default DeleteMessage;
