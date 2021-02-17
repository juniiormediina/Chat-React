const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});
const { connectedUsers } = require("./controllers/user.controller");

/* Routes */
const userRoutes = require("./routes/user.routes");

/* Models DB */
const User = require("./models/User.model");
const Message = require("./models/Messages.model");
User.sync();
Message.sync();

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use(helmet());
app.use(morgan("dev"));

/* Socket */
io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      process.env.JWT_SECRET,
      function (err, decoded) {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  socket.on("join", ({ user }, callback) => {
    socket.join(1);
    Promise.all([
      User.update({ connected: true }, { where: { id: user.id } }),
      Message.findAll({
        include: { model: User, as: user },
        raw: true,
        nest: true,
      }),
    ]).then((response) => {
      updateUsers(socket);
      getHistory(socket, response[1]);
    });
  });

  socket.on("sendMessage", (message, callback) => {
    let data = {
      text: message.text,
      userId: message.user.id,
      date: Date.now(),
      type: message.type,
    };

    Message.create(data).then(() => {
      io.to(1).emit("message", { ...message, date: data.date });
      callback();
    });
  });

  socket.on("disconnect", () => {
    let id = socket.decoded.id;
    User.update({ connected: false }, { where: { id: id } }).then(() => {
      updateUsers(socket);
    });
  });
});
const updateUsers = () => {
  connectedUsers()
    .then((users) => {
      io.to(1).emit("updateList", { users: users });
    })
    .catch((error) => {
      console.log(error);
    });
};
const getHistory = (socket, data) => {
  socket.emit("getHistory", data);
};

server.listen(process.env.PORT || 4000, () => {
  console.log("Server started...");
});
