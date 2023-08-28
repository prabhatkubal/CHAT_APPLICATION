const { ApolloError } = require("apollo-server-express");

class NotFoundError extends ApolloError {
  constructor(resourceName, conflictingField) {
    const message = `${resourceName} with ${conflictingField} not found`;
    super(message, "NOT_FOUND_ERROR");
    this.resourceName = resourceName;
    this.conflictingField = conflictingField;
  }
}

module.exports = NotFoundError;
