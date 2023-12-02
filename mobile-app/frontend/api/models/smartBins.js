const mongoose = require("mongoose");

const smartBinSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  Bins: [
    {
      binId: {
        type: String,
        required: true,
        unique: true,
      },
      location: {
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
      garbageLevel: {
        type: Number,
        default: 0,
      },
      temperatureLevel: {
        type: Number,
        default: 0,
      },
    },
  ],
  totalBins: {
    type: Number,
    required: true,
  },
});

const SmartBin = mongoose.model("SmartBin", smartBinSchema);

module.exports = SmartBin;
