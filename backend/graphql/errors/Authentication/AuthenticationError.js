const { ApolloError } = require("apollo-server-express");

class AuthenticationError extends ApolloError {
  constructor(message = "Permission denied") {
    super(message, "AUTHENTICATION_ERROR");
    this.message = message;
  }
}

module.exports = {
  AuthenticationError,
};
