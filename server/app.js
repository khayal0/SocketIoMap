const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const { Console } = require("console");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

  socket.on("locationFront", (data) => {
    console.log(data, "locationFront ====<<<<");
    socket.broadcast.emit("locationFront", data);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
