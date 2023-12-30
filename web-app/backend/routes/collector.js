const express = require("express");
const { getCollector } = require("../controller/collectorController");

const router = express.Router();

// Endpoint to get collector details
router.get("/collector-details", getCollector);

module.exports = router;
