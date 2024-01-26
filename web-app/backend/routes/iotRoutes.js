// iotRoutes.js
const express = require("express");
const router = express.Router();
const { setSocketIO } = require("../controller/iotController");

// Variable to store the latest MQTT data
let latestMqttData;

// Route to subscribe and get the latest MQTT data
router.get("/subscribe", (req, res) => {
  // Extract the io instance from the setSocketIO function
  const io = setSocketIO(); // Call setSocketIO function without passing any parameter

  // Set the Socket.IO instance in the iotController
  setSocketIO(io);

  // Respond with the latest MQTT data in JSON format
  res.json({ mqttData: latestMqttData });
});

// Set the latest MQTT data when receiving a message
router.post("/publish", (req, res) => {
  const { binId, filledLevel, temperature, latitude, longitude } = req.body;

  // Update the latest MQTT data
  latestMqttData = {
    binId,
    filledLevel,
    temperature,
    latitude,
    longitude,
  };

  // Emit the updated data to connected clients through Socket.IO
  if (io) {
    io.emit("mqttData", latestMqttData);
  }

  res.json({ success: true, message: "MQTT data updated successfully" });
});

module.exports = router;
