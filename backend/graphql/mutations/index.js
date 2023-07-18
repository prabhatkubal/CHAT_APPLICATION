// src/mutations/index.js
const signupUser = require("./signupUser");
const loginUser = require("./loginUser");
const storeUserMessages = require("./storeUserMessages");

const mutations = [signupUser, loginUser, storeUserMessages];

module.exports = mutations;
