const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../services/generateTokenService");
const User = require("../../models").User;

async function verifyToken(req, res, next) {
  // Get the token from the request header, query parameter, or cookie
  const token =
    req?.headers?.authorization?.split(" ")[1] ||
    req?.query?.token ||
    req?.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "No token provided", success: false });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    const decodedValue = jwt.decode(token);
    if (err) {
      // Token is invalid, so proceed with the additional steps
      // Check if the user with this UUID exists in the database
      const user = await User.findOne({ where: { uuid: decodedValue.id } });

      if (!user) {
        return res.status(401).json({ message: "User not found", success: false });
      }

      if (!user.refresh_token) {
        res.clearCookie("jwt", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          // sameSite: 'none',
          // path: '/',
        });
      }

      jwt.verify(
        user.refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            res.clearCookie("jwt", {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              // sameSite: 'none',
              // path: '/',
            });
          }

          // Token is valid
          req.user = decoded; // Add the decoded payload to the request object
          next(); // Call the next middleware or route handler
        }
      );

      // Generate a new access token with the same UUID and send it to the frontend
      const newAccessToken = generateAccessToken({ uuid: decodedValue.id });
      res.cookie("jwt", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set 'secure' based on your environment
        maxAge: 3600000, // Specify the expiration time in milliseconds
        // sameSite: 'none',
        // path: '/',
      });
      // Proceed to the next middleware or route handler
    } else {
      // Token is valid, so simply proceed to the next middleware or route handler
      req.user = decoded; // Add the decoded payload to the request object
    }
  });
}

module.exports = verifyToken;
