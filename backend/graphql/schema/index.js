// src/schema/index.js
const { gql } = require("apollo-server-express");
const userTypes = require("../types/userTypes");
const messageTypes = require("../types/messageTypes");

const typeDefs = gql`
  ${userTypes}
  ${messageTypes}

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

module.exports = typeDefs;
