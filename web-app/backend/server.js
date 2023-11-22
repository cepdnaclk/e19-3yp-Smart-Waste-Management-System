const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const PORT = 1337;

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

mongoose.connect(
  "mongodb+srv://3ypSWMS:SWMSgroup13@cluster0.zet8lxo.mongodb.net/smart-waste-management-system?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
