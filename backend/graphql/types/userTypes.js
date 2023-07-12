const { gql } = require("apollo-server-express");

const userTypes = gql`
  type User {
    id: ID!
    uuid: String
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

  extend type Mutation {
    login(
      email: String!
      password: String!
    ): LoginResponse!

    signup(
      uuid: String
      name: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): SignupResponse!
  }

  type LoginResponse {
    message: String!
    success: Boolean!
    user: User
    accessToken: String
  }

  type SignupResponse {
    message: String!
    success: Boolean!
    user: User
  }
`;

module.exports = userTypes;
