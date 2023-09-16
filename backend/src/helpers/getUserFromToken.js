const jwt = require("jsonwebtoken");
const { User } = require("../../models");

async function getUserFromToken(req) {
  const token =
    req?.headers?.authorization?.split(" ")[1] ||
    req?.query?.token ||
    req?.cookies?.jwt;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ where: { uuid: decoded.id } });
    console.log(user);
    return user;
  } catch (error) {
    return null;
  }
}

module.exports = getUserFromToken;
