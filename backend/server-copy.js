const express = require("express");
const http = require("http");
const cors = require("cors");
const { pool } = require("./config/dbConfig");
const session = require("express-session");
const passport = require("passport");
const { Server } = require("socket.io");
const { verifyToken } = require("./services/verifyToken");
const routes = require("./routes/routes");
const corsOptions = require("./config/corsOptions");
const socketIoOperations = require("./services/messaging/socketioOperations");

const BACKEND_PORT = process.env.PORT || 4000;
// const WEB_SOCKET_PORT = 5000;

const app = express();
const server = http.createServer(app);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: {
    ...corsOptions,
  },
});

io.on("connection", socketIoOperations);

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

app.use("/", routes);

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
