const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const { pool } = require("./config/dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const { Server } = require("socket.io");
const { verifyToken } = require("./services/verifyToken");
const { generateToken } = require("./services/generateToken");

const jwt = require("jsonwebtoken");

const BACKEND_PORT = process.env.PORT || 4000;
// const WEB_SOCKET_PORT = 5000;

const app = express();
const server = http.createServer(app);

// setting up cors
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization", "my-custom-header"],
  credentials: true,
};

app.use(cors(corsOptions));

const io = new Server(server, {
  cors: {
    ...corsOptions,
    preflight: true,
    optionsSuccessStatus: 200,
  },
});

let socketsConnected = new Set();
let onlineUsers = [];

io.on("connection", onConnected);

function onConnected(socket) {
  console.log(`A user connected ${socket.id}`);

  socketsConnected.add(socket.id);
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    console.log("onlineUsers", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    console.log(message);
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientid
    );
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  io.emit("Total-Connected", socketsConnected.size);

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
    console.log(`A user disconnected ${socket.id}`);
    socketsConnected.delete(socket.id);
    io.emit("Total-Connected", socketsConnected.size);
  });
}

console.log("onlineUsers", onlineUsers);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// const initializePassport = require("./config/passportConfig");

// initializePassport(passport);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());

// Connection test with the database
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connection to the database successful");
    release(); // Release the client back to the pool
  }
});

// app.get("/account/signup", checkAuthenticated, (req, res) => {
//   console.log(res, "prabhat");
//   res.redirect("/account/signup");
// });

// app.get("/users/login", checkAuthenticated, (req, res) => {
//   // flash sets a messages variable. passport sets the error message
//   console.log(req.session.flash.error);
//   res.redirect("/account/login");
// });

// app.get("/chat", checkNotAuthenticated, (req, res) => {
//   console.log(req.isAuthenticated());
//   res.redirect("/chat", { user: req.user.name });
// });

// app.get("/users/logout", (req, res) => {
//   req.logout();
//   res.redirect("/account/login", {
//     message: "You have logged out successfully",
//   });
// });

//store messages api
app.post("/messages", verifyToken, (req, res) => {
  const { senderid, recipientid, chatid, message, dateTime } = req.body;

  const insertQuery = `
    INSERT INTO messages (senderId, recipientId, chatId, message, dateTime)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [senderid, recipientid, chatid, message, dateTime];

  pool.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting message:", err);
      return res
        .status(500)
        .json({ success: false, error: "Failed to insert message" });
    }

    const insertedMessage = result.rows[0];
    return res.status(200).json({
      success: true,
      message: "Message inserted successfully",
      insertedMessage,
    });
  });
});

// get messages api
app.get("/messages/:senderid/:recipientid", verifyToken, (req, res) => {
  const senderId = req.params.senderid;
  const recipientId = req.params.recipientid;

  const selectQuery = `
    SELECT *
    FROM messages
    WHERE (senderId = $1 AND recipientId = $2) OR (senderId = $2 AND recipientId = $1)
    ORDER BY dateTime ASC
  `;

  pool.query(selectQuery, [senderId, recipientId], (err, result) => {
    if (err) {
      console.error("Error retrieving messages:", err);
      return res
        .status(500)
        .json({ success: false, error: "Failed to retrieve messages" });
    }

    const messages = result.rows;
    return res.status(200).json({ success: true, messages });
  });
});

//delete messages
//code to change url
app.delete("/messages/:chatId/:messageId", verifyToken, (req, res) => {
  // Delete the message

  // Change the URL to "/messages" without reloading the page
  const newUrl = "/messages";
  const stateObj = { page: "messages" };
  history.pushState(stateObj, "", newUrl);

  // Send response or perform any additional actions
});

//query params
app.delete("/messages/:chatId/:messageId", verifyToken, (req, res) => {
  const chatId = req.params.chatId;
  const messageId = req.params.messageId;

  const deleteQuery = `
    DELETE FROM messages
    WHERE chatId = $1 AND messageId = $2
  `;

  const values = [chatId, messageId];

  pool.query(deleteQuery, values, (err, result) => {
    if (err) {
      console.error("Error deleting message:", err);
      return res
        .status(500)
        .json({ success: false, error: "Failed to delete message" });
    }

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Message not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Message deleted successfully" });
  });
});

//body
app.delete("/messages", verifyToken, (req, res) => {
  const { chatId, messageId } = req.body;

  if (!chatId || !messageId) {
    return res.status(400).json({
      success: false,
      error: "Invalid request. Both chatId and messageId are required.",
    });
  }

  const deleteQuery = `
    DELETE FROM messages
    WHERE chatId = $1 AND messageId = $2
  `;

  const values = [chatId, messageId];

  pool.query(deleteQuery, values, (err, result) => {
    if (err) {
      console.error("Error deleting message:", err);
      return res
        .status(500)
        .json({ success: false, error: "Failed to delete message" });
    }

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Message not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Message deleted successfully" });
  });
});

// signup api
app.post("/account/signup", async (req, res) => {
  let { name, email, password, confirmPassword } = req.body;

  console.log({ name, email, password, confirmPassword });

  let errors = {
    message: "",
  };

  if (!name || !email || !password || !confirmPassword) {
    errors = {
      message: "Please enter all fields",
    };
  }

  if (name && email && password && confirmPassword && password.length < 6) {
    errors = {
      message: "Password is too short",
    };
  }

  if (password !== confirmPassword) {
    errors = {
      message: "Password does not match",
    };
  }

  if (errors.message !== "") {
    res.status(400).json({ errors, success: false });
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
      `SELECT * FROM users
      WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        if (results.rows.length > 0) {
          errors = {
            message: "Email already registered",
          };
          res.status(400).json({ errors, success: false });
        } else {
          const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, name, email, password
          `;

          const values = [name, email, hashedPassword];

          pool.query(query, values, (err, result) => {
            if (err) {
              console.error("Error inserting user:", err);
              return res
                .status(500)
                .json({ error: "Failed to create user", success: false });
            }
            // User successfully inserted into the database
            const newUser = result.rows[0];
            res.status(200).json({
              message: "Signup successful",
              success: true,
              user: newUser,
            });
          });
        }
      }
    );
  }
});

// login api
app.post("/account/login", verifyToken, async (req, res) => {
  let { email, password } = req.body;

  console.log({ email, password });

  let errors = {
    message: "",
  };

  if (!email || !password) {
    errors = {
      message: "Please enter all fields",
    };
  }

  if (email && password && password.length < 6) {
    errors = {
      message: "Password is too short",
    };
  }

  if (errors.message !== "") {
    res.status(400).json({ errors, success: false });
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              errors = {
                message: err,
              };
              res.status(400).json({ errors, success: false });
            }
            if (isMatch) {
              const token = generateToken(user); // Generate JWT token
              errors = {
                message: "You have logged in successfuly",
              };
              return res
                .status(200)
                .json({ errors, success: true, user, token });
            } else {
              //password is incorrect
              errors = {
                message: "Password is incorrect",
              };
              return res.status(401).json({ errors, success: false });
            }
          });
        } else {
          // No user
          errors = {
            message: "No user with that email address",
          };
          return res.status(400).json({ errors, success: false });
        }
      }
    );
  }
});

// Get all users
app.get("/users", verifyToken, (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error retrieving users:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve users", success: false });
    }

    const users = results.rows;
    res.status(200).json({ users, success: true });
  });
});

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = res.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({ error: errorMessage, success: false });
});

// app.post(
//   "/account/login",
//   passport.authenticate("local", {
//     successRedirect: "/chat",
//     failureRedirect: "/account/login",
//     failureFlash: true,
//   })
// );

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect("/users/dashboard");
//   }
//   next();
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/users/login");
// }

server.listen(BACKEND_PORT, () => {
  console.log(`Server listening on port ${BACKEND_PORT}`);
});
