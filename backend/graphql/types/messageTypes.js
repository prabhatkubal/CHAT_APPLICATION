const { gql } = require("apollo-server-express");

const messageTypes = gql`
  type Message {
    messageId: ID!
    senderId: Int!
    recipientId: Int!
    chatId: String!
    message: String!
    dateTime: String!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getMessages(senderId: Int!, recipientId: Int!): [Message!]!
  }

  extend type Mutation {
    storeMessages(
      senderId: Int!
      recipientId: Int!
      chatId: String!
      message: String!
      dateTime: String!
    ): StoreMessageResponse!
  }

  type StoreMessageResponse {
    success: Boolean!
    message: String!
    insertedMessage: Message
  }

  type Mutation {
    deleteMessage(messageId: String!, chatId: String!): DeleteMessageResponse!
  }

  type DeleteMessageResponse {
    success: Boolean!
    message: String!
  }
`;

module.exports = messageTypes;
