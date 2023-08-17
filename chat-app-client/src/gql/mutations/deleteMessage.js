import { gql } from "@apollo/client";

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($messageId: String!, $chatId: String!) {
    deleteMessage(messageId: $messageId, chatId: $chatId) {
      success
      message
    }
  }
`;
