const express = require("express");
const { chats } = require("./Data/dummy");
const connectDb = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const userRouter = require("./routes/user");
const { notFound, errorHandler } = require("./middlewares/Notfound");
const uploadRouter = require("./routes/upload");
const chatRouter = require("./routes/Chat");
const msgRouter = require("./routes/Msg");
const user = require("./routes/upload");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDb();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/server/user", userRouter);
app.use("/server/upload", uploadRouter);
app.use("/server/chat", chatRouter);
app.use("/server/msg", msgRouter);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "build")));
  app.use(cookieParser());

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5173;
const server = app.listen(
  PORT,
  console.log(`server started ${PORT}`.white.bgYellow)
);

const io = require("socket.io")(server, {
  pingTimmeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("done");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("room", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
