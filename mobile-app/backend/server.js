const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const collectorRoute = require("./routes/collector");
const userRoute = require("./routes/users");
const feedbackRoute = require("./routes/feedback");
require("dotenv").config();
const DB_URL = process.env.DB_URL;

const app = express();
const PORT = 1337;

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", collectorRoute);
app.use("/api", userRoute);
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
