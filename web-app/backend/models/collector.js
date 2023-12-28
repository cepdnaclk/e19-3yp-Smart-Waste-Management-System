const mongoose = require("mongoose");

const collector = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, required: true },
  },
  { collection: "collector-data" }
);

const model = mongoose.model("Collector", collector);

module.exports = model;
