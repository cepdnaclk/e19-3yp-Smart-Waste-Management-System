const Collector = require("../models/collector");

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

module.exports = {
  getCollector,
};
