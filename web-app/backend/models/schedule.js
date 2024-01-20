const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    collectorID: { type: String, required: true },
    collectBin: { type: String, required: true },
  },
  { collection: "schedule" }
);

const ScheduleModel = mongoose.model("Schedule", scheduleSchema);

module.exports = ScheduleModel;
