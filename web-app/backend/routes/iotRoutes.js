const express = require("express");
const router = express.Router();
const { setSocketIO } = require("../controller/iotController");

// Route to subscribe and get the latest MQTT data
router.get("/subscribe", (req, res) => {
  // Set the Socket.IO instance in the iotController
  setSocketIO(io);

  // Respond with the latest MQTT data in JSON format
  res.json({ mqttData: latestMqttData });
});
module.exports = router;
