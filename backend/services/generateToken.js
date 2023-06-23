function generateToken(user) {
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    "secretKey",
    { expiresIn: "1h" }
  );
  return token;
}

module.exports = { generateToken };
