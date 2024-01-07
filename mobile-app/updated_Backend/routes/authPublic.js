const express = require("express");
const { loginUser, singupUser } = require("../controller/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", singupUser);

module.exports = router;
