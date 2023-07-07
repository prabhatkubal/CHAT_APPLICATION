const userResolver = require("./resolvers/userResolver");

const resolvers = {
  ...userResolver,
};

module.exports = resolvers;
