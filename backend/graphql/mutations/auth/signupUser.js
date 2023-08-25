const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { user } = require("../../../models");

const signupUser = {
  Mutation: {
    signup: async (_, { uuid, name, email, password, confirmPassword }) => {
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
          throw new Error(JSON.stringify(errors));
        }

        // Check if email is already registered
        const existingUser = await user.findOne({ where: { email } });
        if (existingUser) {
          throw new Error("Email already registered");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(`${password}isolate28`, 10);

        // Create a new user
        const uuid = uuidv4();

        const newUser = await User.create({
          uuid,
          name,
          email,
          password: hashedPassword,
        });

        console.log(newUser);

        return {
          message: "Signup successful",
          success: true,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          },
        };
      } catch (err) {
        console.error("Error creating user:", err);
        throw new Error("Failed to create user");
      }
    },
  },
};

module.exports = signupUser;
