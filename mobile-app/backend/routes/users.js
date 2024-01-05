const express = require("express");
const { getUsers, deleteUser } = require("../controller/userController");

const router = express.Router();

router.get("/user-details", getUsers);
router.delete("/user-details/:id", deleteUser);

module.exports = router;
