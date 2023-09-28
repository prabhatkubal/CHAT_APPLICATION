const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../../../models");

const signupUser = {
  Mutation: {
    signup: async (
      _,
      { uuid, firstname, lastname, email, password, confirmPassword }
    ) => {
      try {
        // Validate inputs
        let errors = {};

        if (
          !firstname ||
          !lastname ||
          !email ||
          !password ||
          !confirmPassword
        ) {
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
        const existingUser = await User.findOne({ where: { email } });
        console.log(existingUser, "###############");
        if (existingUser) {
          return {
            message: "Email already registered",
            success: false,
          };
          throw new Error("Email already registered");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(`${password}isolate28`, 10);

        // Create a new user
        const uuid = uuidv4();

        const newUser = await User.create({
          uuid,
          firstname,
          lastname,
          email,
          username: `${firstname}${lastname}`,
          password: hashedPassword,
        });

        console.log(newUser);

        return {
          message: "Signup successful",
          success: true,
          user: {
            id: newUser.id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            username: newUser.username,
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
