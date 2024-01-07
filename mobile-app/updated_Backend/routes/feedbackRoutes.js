const express = require("express");
const { postFeedback } = require("../controller/feedbackController");

const router = express.Router();

router.post("/feedback", postFeedback);

module.exports = router;
