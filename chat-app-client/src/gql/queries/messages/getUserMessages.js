import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query GetMessages($senderId: Int!, $recipientId: Int!) {
    getMessages(senderId: $senderId, recipientId: $recipientId) {
      messageId
      senderId
      recipientId
      chatId
      message
      dateTime
    }
  }
`;
