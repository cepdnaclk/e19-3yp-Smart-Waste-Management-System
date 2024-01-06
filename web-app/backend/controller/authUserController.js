const admin = require("../models/admin");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminUser = await admin.login(email, password);

    const token = createToken(adminUser._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signip user
const singupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const adminUser = await admin.signup(name, email, password);
    const token = createToken(adminUser._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, singupUser };
