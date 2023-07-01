const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const corsOptions = require("../../config/corsOptions");

const app = express();
const server = http.createServer(app);

let socketsConnected = new Set();
let onlineUsers = [];

const io = new Server(server, {
  cors: {
    ...corsOptions,
  },
});

function socketIoOperations(socket) {
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

module.exports = socketIoOperations;
