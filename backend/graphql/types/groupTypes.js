const { gql } = require("apollo-server-express");

const groupTypes = gql`
  type Group {
    groupId: ID!
    groupName: String!
    adminId: Int!
    members: [Member!]!
    messages: [GroupMessage!]!
    createdAt: String!
    updatedAt: String!
  }

  extend type Mutation {
    createGroup(groupName: String!, userId: Int!): CreateGroupResponse!
  }

  type CreateGroupResponse {
    message: String!
    success: Boolean!
    group: Group
  }
`;

module.exports = groupTypes;
