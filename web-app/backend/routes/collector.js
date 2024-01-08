const express = require("express");
const {
  getCollector,
  deleteCollector,
  updateCollectorStatus,
} = require("../controller/collectorController");

const router = express.Router();

// Endpoint to get collector details
router.get("/collector-details", getCollector);
router.delete("/collector-details/:id", deleteCollector);
router.put("/collector-details/:id", updateCollectorStatus);

module.exports = router;
