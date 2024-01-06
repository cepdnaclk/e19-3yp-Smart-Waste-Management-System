// collectorRoutes.js
const express = require("express");
const {
  createCollector,
  getCollector,
  deleteCollector,
} = require("../controller/collectorController");

const router = express.Router();

router.post("/create-collector", async (req, res) => {
  try {
    await createCollector(req, res);
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to get collector details
router.get("/collector-details", getCollector);
router.delete("/collector-details/:id", deleteCollector);

module.exports = router;
