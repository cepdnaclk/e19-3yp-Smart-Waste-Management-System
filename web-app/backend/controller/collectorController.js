const Collector = require("../models/collector");
const mongoose = require("mongoose");

const getCollector = async (req, res) => {
  try {
    // Fetch all collectors from the MongoDB collection
    const collectors = await Collector.find();
    res.json(collectors);
  } catch (error) {
    console.error("Error fetching collector details:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteCollector = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID." });
  }

  try {
    const collector = await Collector.findOneAndDelete({ _id: id });

    if (!collector) {
      return res.status(400).json({ error: "No such collector" });
    }

    res.status(200).json(collector);
  } catch (error) {
    console.error("Error deleting collector:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateCollectorStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID." });
  }

  try {
    const collector = await Collector.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!collector) {
      return res.status(400).json({ error: "No such collector" });
    }

    res.status(200).json(collector);
  } catch (error) {
    console.error("Error updating collector status:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getCollector,
  deleteCollector,
  updateCollectorStatus,
};
