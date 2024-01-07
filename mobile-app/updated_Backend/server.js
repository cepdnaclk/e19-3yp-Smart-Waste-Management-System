const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const collectorRoute = require("./routes/authCollector");
const publicRoute = require("./routes/authPublic");
const feedbackRoute = require("./routes/feedbackRoutes");
require("dotenv").config();
const DB_URL = process.env.DB_URL;

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/api/collector", collectorRoute);
app.use("/api/public", publicRoute);
app.use("/api", feedbackRoute);

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
