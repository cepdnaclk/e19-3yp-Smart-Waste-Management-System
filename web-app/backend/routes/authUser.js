const express = require("express");
const { loginUser, singupUser } = require("../controller/authUserController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", singupUser);

module.exports = router;
