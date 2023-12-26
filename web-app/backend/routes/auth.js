const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    if (!req.body.password) {
      return res
        .status(400)
        .json({ status: "error", error: "Password is required!" });
    }

    const newPassword = await bcrypt.hash(req.body.password, 10);
    await Admin.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });

    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      error: "Something went wrong during registration!",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ email: req.body.email });

    if (!existingAdmin) {
      return res.json({ status: "error", error: "Invalid login!" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      existingAdmin.password
    );

    if (isPasswordValid) {
      const token = jwt.sign(
        { name: existingAdmin.name, email: existingAdmin.email },
        process.env.JWT_SECRET || "defaultSecretKey"
      );

      res.json({ status: "ok", admin: token });
    } else {
      res.json({ status: "error", admin: false });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", error: "Something went wrong during login!" });
  }
});

module.exports = router;
