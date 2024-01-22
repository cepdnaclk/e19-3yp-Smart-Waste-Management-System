const express = require("express");
const { Schedule, getSchedule } = require("../controller/scheduleController");

const router = express.Router();

router.post("/scheduleCollection", Schedule);
router.get("/scheduleCollection", getSchedule);
module.exports = router;
