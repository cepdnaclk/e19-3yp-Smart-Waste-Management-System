const express = require("express");
const router = express.Router();
const { subscribeToIoTData } = require("../controller/iotController");

router.get("/subscribe", (req, res) => {
  const io = req.app.get("socketio");
  subscribeToIoTData(io);

  res.status(200).json({ message: "Subscribed to IoT data" });
});

module.exports = router;
