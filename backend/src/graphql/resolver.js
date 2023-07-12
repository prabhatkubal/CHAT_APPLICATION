const userQueries = require("../../graphql/queries/userQueries");

const resolvers = {
  ...userQueries,
};

module.exports = resolvers;
