const User = require("../../../models").User;

const userQueries = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (err) {
        console.error("Error retrieving users:", err);
        throw new Error("Failed to retrieve users");
      }
    },
  },
};

module.exports = userResolver;
