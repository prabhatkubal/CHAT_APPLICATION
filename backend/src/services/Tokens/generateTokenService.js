const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  console.log(user);
  const token = jwt.sign(
    { id: user.uuid },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2s" }
  );
  return token;
}

function generateRefreshToken(user) {
  const token = jwt.sign(
    { id: user.uuid },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "36d" }
  );
  return token;
}

module.exports = { generateAccessToken, generateRefreshToken };
