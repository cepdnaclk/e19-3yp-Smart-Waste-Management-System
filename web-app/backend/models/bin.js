const mongoose = require("mongoose");

const bins = new mongoose.Schema(
  {
    binId: { type: String, required: true },
    area: { type: String, required: true },
    height: { type: String, required: true },
  },
  { collection: "bins" }
);

const model = mongoose.model("bins", bins);

module.exports = model;
