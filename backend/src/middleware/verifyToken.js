const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // Get the token from the request header, query parameter, or cookie
  const token =
    req?.headers?.authorization?.split(' ')[1] || req?.query?.token || req?.cookies?.jwt;

    // const jwt = req?.cookies?.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided", success: false });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    // Token is valid
    req.user = decoded; // Add the decoded payload to the request object
    next(); // Call the next middleware or route handler
  });
}

module.exports = verifyToken;
