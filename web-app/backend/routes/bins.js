const express = require("express");
const { getBins, createBin } = require("../controller/binController");

const router = express.Router();

router.get("/bins", getBins);
router.post("/bins", createBin);

module.exports = router;
