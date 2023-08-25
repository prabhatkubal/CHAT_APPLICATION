const signupUser = require("./auth/signupUser");
const loginUser = require("./auth/loginUser");
const storeUserMessages = require("./chat/message/storeUserMessages");
const logoutUser = require("./auth/logoutUser");
const deleteMessage = require("./chat/message/deleteMessage");
const createGroup = require("./chat/groupChat/createGroup");
const addMemberToGroup = require("./chat/groupChat/addMemberToGroup");
const promoteMemberToAdmin = require("./chat/groupChat/promoteMemberToAdmin");
const removeMemberFromGroup = require("./chat/groupChat/removeMemberFromGroup");
const mutations = [
  signupUser,
  loginUser,
  logoutUser,
  storeUserMessages,
  deleteMessage,
  createGroup,
  addMemberToGroup,
  promoteMemberToAdmin,
  removeMemberFromGroup,
];

module.exports = mutations;
