const express = require("express");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sequelize = require("./configuration/db.config");
const userRoutes = require("./src/routers/userRoutes");
const cors = require("cors");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");
const app = express();
require("dotenv").config();

const httpServer = require("http").createServer(app);
const io = new Server(httpServer);

const port = 5000;

app.use(cors());
app.use(morgan("common"));

console.log(uuid());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database is synced");
  })
  .catch((err) => {
    console.error("Database sync failed:", err);
  });

io.on("connection", (Socket) => {
  console.log("A user connected");

  Socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
