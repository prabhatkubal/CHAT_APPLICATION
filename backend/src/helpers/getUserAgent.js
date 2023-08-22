var http = require("http");
var parser = require("ua-parser-js");

const userAgentService = (userAgentString) => {
  var userAgent = parser(userAgentString);

  return userAgent;
};

module.exports = userAgentService;
