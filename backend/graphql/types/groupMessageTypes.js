const { gql } = require("apollo-server-express");

const groupMessageTypes = gql`
  type GroupMessage {
    groupMessageId: ID!
    groupId: Int!
    senderId: Int!
    message: String!
    dateTime: String!
    group: Group!
    sender: User!
    createdAt: String!
    updatedAt: String!
  }
`;

module.exports = groupMessageTypes;