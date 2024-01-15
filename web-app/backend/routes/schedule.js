const express = require("express");
const { Schedule } = require("../controller/scheduleController");

const router = express.Router();

router.post("/scheduleCollection", Schedule);

module.exports = router;
