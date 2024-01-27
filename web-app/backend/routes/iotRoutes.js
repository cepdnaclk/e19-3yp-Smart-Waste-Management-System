const express = require("express");
const router = express.Router();
const mqttController = require("../controller/iotController");

// Route to get latest MQTT data
router.get("/subscribe", (req, res) => {
  // Get the latest MQTT data
  const latestMqttData = mqttController.getLatestMqttData();

  if (latestMqttData) {
    // Respond with the latest MQTT data
    res.json(latestMqttData);
  } else {
    // If no data is available, respond with an error message
    res.status(404).json({ error: "No MQTT data available" });
  }
});

module.exports = router;
