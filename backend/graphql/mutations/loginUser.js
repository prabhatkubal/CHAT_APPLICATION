const bcrypt = require("bcrypt");
const User = require("../../models").User;
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../src/services/generateTokenService");

const loginUser = {
  Mutation: {
    login: async (_, { email, password }, { res }) => {
      try {
        // Validate inputs
        let errors = {};

        if (!email || !password) {
          errors.message = "Please enter all fields";
        } else if (password.length < 6) {
          errors.message = "Password is too short";
        }

        if (Object.keys(errors).length > 0) {
          throw new Error(JSON.stringify(errors));
        }

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error("No user with that email address");
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(
          `${password}isolate28`,
          user.password
        );
        if (!isMatch) {
          throw new Error("Password is incorrect");
        }

        // Generate access token and refresh token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Update refresh token in the database
        await user.update({ refresh_token: refreshToken });

        console.log(res, "my response");

        res.cookie("jwt", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Set 'secure' based on your environment
          maxAge: 3600000, // Specify the expiration time in milliseconds
          // sameSite: 'none',
          // path: '/',
        });

        return {
          message: "You have logged in successfully",
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          accessToken,
        };
      } catch (err) {
        console.error("Error during login:", err);
        throw new Error("Failed to log in");
      }
    },
  },
};

module.exports = loginUser;
