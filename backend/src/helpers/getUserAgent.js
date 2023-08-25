var http = require("http");
var parser = require("ua-parser-js");

const getUserAgent = (userAgentString) => {
  var userAgent = parser(userAgentString);

  return userAgent;
};

module.exports = getUserAgent;
