const verifyToken = require("./verifyToken");

const customMiddleware = (req, res, next) => {
  // console.log(req.headers.clientpathname);
  if (
    req.headers.clientpathname !== "/account/login" &&
    req.headers.clientpathname !== "/account/signup"
  ) {
    verifyToken(req, res, next);
  } else {
    next();
  }
};


module.exports = customMiddleware;