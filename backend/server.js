const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const cors = require("cors");
const { sequelize } = require("./models");
const { Server } = require("socket.io");
const corsOptions = require("./src/config/corsOptions");
const cookieParser = require("cookie-parser");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { customMiddleware } = require("./src/middlewares");
const getUserFromToken = require("./src/helpers/getUserFromToken");

const BACKEND_PORT = process.env.PORT || 4000;

const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//apollo server connection
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: async ({ req, res }) => ({ req, res }),
    context: async ({ req }) => {
      // Get the user object from the token using your authentication logic
      const user = await getUserFromToken(req);

      // Attach the user object to the context along with the req and res objects
      return { user, req, res: req.res };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });
}

startApolloServer()
  .then(() => {
    console.log("Apollo Server started");
  })
  .catch((error) => {
    console.error("Error starting Apollo Server:", error);
  });

//http server for socket.io
const server = http.createServer(app);

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
        id: userId,
        socketId: socket.id,
      });

    io.emit("getOnlineUsers", onlineUsers);
  });

  console.log("onlineUsers", onlineUsers);

  socket.on("sendMessage", (message) => {
    console.log(message.recipientId, message);
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

app.use(express.json());

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

// app.use(customMiddleware);

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
  console.log(`WEB SOCKET & SERVER listening on port ${BACKEND_PORT}`);
});

// app.listen(BACKEND_PORT, () => {
//   console.log(`Server listening on port ${BACKEND_PORT}`);
// });
