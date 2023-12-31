const express = require("express");
const {
  getCollector,
  deleteCollector,
} = require("../controller/collectorController");

const router = express.Router();

// Endpoint to get collector details
router.get("/collector-details", getCollector);
router.delete("/collector-details/:id", deleteCollector);

module.exports = router;
