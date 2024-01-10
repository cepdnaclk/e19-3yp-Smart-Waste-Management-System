const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const collectorRoute = require("./routes/collector");
const userRoute = require("./routes/users");
const feedbackRoute = require("./routes/feedback");
const authUserRoute = require("./routes/authUser");
require("dotenv").config();
const DB_URL = process.env.DB_URL;
const path = require("path");

const app = express();
const PORT = 1337;

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../frontend/build/index.html");

app.use(express.static(buildPath));

app.get("/", function (req, res) {
  res.sendFile(__dirname, "../frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    };
});

app.use(cors());
app.use(express.json());
app.use("/api", collectorRoute);
app.use("/api", userRoute);
app.use("/api", feedbackRoute);
app.use("/api/user", authUserRoute);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
