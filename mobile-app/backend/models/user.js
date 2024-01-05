const mongoose = require("mongoose");

const users = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "public-data" }
);
const model = mongoose.model("users", users);

module.exports = model;
