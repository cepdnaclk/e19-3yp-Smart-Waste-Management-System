const mongoose = require("mongoose");

const admin = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "admin-data" }
);

const model = mongoose.model("adminData", admin);

module.exports = model;
