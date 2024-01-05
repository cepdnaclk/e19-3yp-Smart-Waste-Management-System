const express = require("express");
const { getFeedback } = require("../controller/feedbackController");

const router = express.Router();

router.get("/feedback", getFeedback);

module.exports = router;
