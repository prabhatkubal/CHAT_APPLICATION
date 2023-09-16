// src/queries/index.js
const getAllGroups = require("./Chat/groupChat/getAllGroups");
const getAllUsers = require("./getAllUsers");
const getUsersMessages = require("./getUsersMessages");

const queries = [getAllUsers, getUsersMessages, getAllGroups];

module.exports = queries;
