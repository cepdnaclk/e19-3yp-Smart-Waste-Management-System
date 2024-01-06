// collectorController.js
const bcrypt = require("bcrypt");
const Collector = require("../models/collector");

const createCollector = async (req, res) => {
  try {
    const { name, email, status, password } = req.body;

    if (!name || !email || !status || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingCollector = await Collector.findOne({ email });
    if (existingCollector) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const collector = new Collector({ name, email, status, password: hashedPassword });
    await collector.save();

    res.status(201).json(collector);
  } catch (error) {
    console.error("Error creating collector:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createCollector,
  getCollector,
  deleteCollector,
};
