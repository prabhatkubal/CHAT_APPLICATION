const { gql } = require("apollo-server-express");

const memberTypes = gql`
  type Member {
    memberId: ID!
    groupId: Int!
    userId: Int!
    isAdmin: Boolean!
    user: User!
    group: Group!
    createdAt: String!
    updatedAt: String!
  }
`;

module.exports = memberTypes;