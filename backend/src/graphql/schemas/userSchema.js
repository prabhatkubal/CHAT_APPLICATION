const { gql } = require("apollo-server-express");

const userSchema = gql`
  type User {
    id: ID!
    uuid: String!
    name: String!
    email: String!
    password: String!
    accessToken: String
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    getUsers: [User!]!
  }
`;

module.exports = userSchema;
