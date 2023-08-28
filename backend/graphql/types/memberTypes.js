const { gql } = require("apollo-server-express");

const memberTypes = gql`
  type Member {
    memberId: ID!
    groupId: String!
    userId: Int!
    isAdmin: Boolean!
    user: User!
    group: Group!
    createdAt: String!
    updatedAt: String!
  }

  extend type Mutation {
    addMemberToGroup(groupId: String!, userId: Int!): AddMemberToGroupResponse!
  }

  type AddMemberToGroupResponse {
    success: Boolean!
    message: String!
  }
`;

module.exports = memberTypes;
