const express = require("express");
const http = require("http");
const cors = require("cors");
const { pool } = require("./src/config/db.Config");
const { sequelize } = require("./models");
// const session = require("express-session");
// const passport = require("passport");
const { Server } = require("socket.io");
const routes = require("./src/routes/routes");
const authRoutes = require("./src/routes/routes.auth");
const corsOptions = require("./src/config/corsOptions");
const cookieParser = require("cookie-parser");
const verifyToken = require("./src/middleware/verifyToken");

const BACKEND_PORT = process.env.PORT || 4000;
// const WEB_SOCKET_PORT = 5000;

const app = express();
app.use(cors(corsOptions));

const server = http.createServer(app);

// for form data
app.use(express.urlencoded({ extended: true }));

// for json data
app.use(express.json());

// for cookies
app.use(cookieParser());

const io = new Server(server, {
  cors: {
    ...corsOptions,
  },
});

io.on("connection", socketioOperations);

let socketsConnected = new Set();
let onlineUsers = [];

// socket io operations
function socketioOperations(socket) {
  console.log(`A user connected ${socket.id}`);
  socketsConnected.add(socket.id);
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.id == userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    console.log("prabhat");

    io.emit("getOnlineUsers", onlineUsers);
  });

  console.log(onlineUsers);

  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find((user) => user.id == message.recipientId);
    console.log("prabhat", user);

    if (user) {
      console.log("prabhat");
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

// console.log("onlineUsers", onlineUsers);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// const initializePassport = require("./config/passportConfig");

// initializePassport(passport);

app.use(express.json());

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // Funtion inside passport which initializes passport
// app.use(passport.initialize());
// // Store our variables to be persisted across the whole session. Works with app.use(Session) above
// app.use(passport.session());

// Connection test with the database
async function connectDatabase() {
  try {
    await sequelize.authenticate(); // Test the database connection
    console.log("Database connection has been established successfully.");

    // Sync models with the database (create tables if they don't exist)
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connectDatabase();

app.use("/", authRoutes);

app.use(verifyToken);
app.use("/", routes);

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

server.listen(BACKEND_PORT, () => {
  console.log(`Server listening on port ${BACKEND_PORT}`);
});
