const { gql } = require("apollo-server-express");
const userSchema = require("./schemas/userSchema");

const typeDefs = gql`
  ${userSchema}

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

module.exports = typeDefs;
