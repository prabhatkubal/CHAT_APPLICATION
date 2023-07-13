import { gql } from '@apollo/client';

export const STORE_MESSAGES = gql`
  mutation StoreMessages($senderId: Int!, $recipientId: Int!, $chatId: String!, $message: String!, $dateTime: String!) {
    storeMessages(senderId: $senderId, recipientId: $recipientId, chatId: $chatId, message: $message, dateTime: $dateTime) {
      success
      message
      insertedMessage {
        messageId
        senderId
        recipientId
        chatId
        message
        dateTime
      }
    }
  }
`;
