const mongoose = require("mongoose");

const feedback = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    feedback: { type: String, required: true },
  },
  { collection: "feedback" }
);

const model = mongoose.model("feedback", feedback);

module.exports = model;
