const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

const collectorRoute = require("./routes/collector");
const userRoute = require("./routes/users");
const feedbackRoute = require("./routes/feedback");
const authUserRoute = require("./routes/authUser");
const scheduleRoute = require("./routes/schedule");
require("dotenv").config();
const DB_URL = process.env.DB_URL;

const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = 1337;

// Deployment BEGIN
const path = require("path");
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../frontend/build");

// Deployment END

app.use(cors());
app.use(express.json());
app.use("/api", collectorRoute);
app.use("/api", userRoute);
app.use("/api", feedbackRoute);
app.use("/api/user", authUserRoute);
app.use("/api", scheduleRoute);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// IoT connection BEGIN

const socketIo = require("socket.io");
const iotRoutes = require("./routes/iotRoutes");

const io = socketIo(server);

app.use((req, res, next) => {
  req.app.set("socketio", io);
  next();
});

app.use("/iot", iotRoutes);

// IoT connection END

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.use(express.static(buildPath));

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(buildPath, "index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
