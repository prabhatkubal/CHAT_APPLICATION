const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { sequelize } = require("../config/db.Config");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/generateTokenService");
const verifyToken = require("../middleware/verifyToken");
const User = require("../../models").User;
const { handleRefreshToken } = require("../controllers/refreshTokenController");

// Signup API
router.post("/account/signup", async (req, res) => {
  const { uuid, name, email, password, confirmPassword } = req.body;

  try {
    // Validate inputs
    let errors = {};

    if (!name || !email || !password || !confirmPassword) {
      errors.message = "Please enter all fields";
    } else if (password.length < 6) {
      errors.message = "Password is too short";
    } else if (password !== confirmPassword) {
      errors.message = "Password does not match";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors, success: false });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      errors.message = "Email already registered";
      return res.status(400).json({ errors, success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(`${password}isolate28`, 10);

    console.log(password, hashedPassword);

    // Create a new user
    const newUser = await User.create({
      uuid,
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Signup successful",
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res
      .status(500)
      .json({ error: "Failed to create user", success: false, err });
  }
});

// Login API
router.post("/account/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate inputs
    let errors = {};

    if (!email || !password) {
      errors.message = "Please enter all fields";
    } else if (password.length < 6) {
      errors.message = "Password is too short";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors, success: false });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      errors.message = "No user with that email address";
      return res.status(401).json({ errors, success: false });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(`${password}isolate28`, user.password);
    if (!isMatch) {
      errors.message = "Password is incorrect";
      return res.status(401).json({ errors, success: false });
    }

    // Generate access token and refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Update refresh token in the database
    await user.update({ refresh_token: refreshToken });

    // Set the refresh token as a cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Example: Set the cookie expiration to 24 hours
    });

    res.status(200).json({
      message: "You have logged in successfully",
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Failed to log in", success: false, err });
  }
});

// Refresh token API
router.get("/account/refresh", async (req, res) => {
  const refreshToken = req.cookies.jwt;

  if (!refreshToken) {
    return res.status(401);
  }

  try {
    // Find the user by refresh token
    const foundUser = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!foundUser) {
      return res.status(403);
    }

    // Verify refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.email !== decoded.email) {
          return res.status(403);
        }

        // Generate new access token
        const accessToken = generateAccessToken(decoded);

        return res.status(200).json({
          success: true,
          accessToken,
        });
      }
    );
  } catch (err) {
    console.error("Error refreshing token:", err);
    res.status(500);
  }
});

module.exports = router;
