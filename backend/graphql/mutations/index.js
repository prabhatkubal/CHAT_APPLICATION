// src/mutations/index.js
const signupUser = require("./signupUser");
const loginUser = require("./loginUser");
const storeUserMessages = require("./storeUserMessages");
const logoutUser = require("./logoutUser");
const mutations = [signupUser, loginUser, logoutUser, storeUserMessages];

module.exports = mutations;
