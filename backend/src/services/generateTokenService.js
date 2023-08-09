const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  console.log(user);
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  return token;
}

function generateRefreshToken(user) {
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "36d" }
  );
  return token;
}

module.exports = { generateAccessToken, generateRefreshToken };
