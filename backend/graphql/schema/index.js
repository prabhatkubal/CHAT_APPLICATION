// src/schema/index.js
const { gql } = require("apollo-server-express");
const userTypes = require("../types/userTypes");
const messageTypes = require("../types/messageTypes");
const groupTypes = require("../types/groupTypes");
const memberTypes = require("../types/memberTypes");
const groupMessageTypes = require("../types/groupMessageTypes");

const typeDefs = gql`
  ${userTypes}
  ${messageTypes}
  ${groupTypes}
  ${memberTypes}
  ${groupMessageTypes}

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

module.exports = typeDefs;
