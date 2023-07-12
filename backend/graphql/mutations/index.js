// src/mutations/index.js
const signupUser = require("./signupUser");
const loginUser = require("./loginUser");

const mutations = [signupUser, loginUser];

module.exports = mutations;
