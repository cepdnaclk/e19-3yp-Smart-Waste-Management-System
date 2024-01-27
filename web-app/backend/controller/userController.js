const mongoose = require("mongoose");
const user = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await user.find();
    // Count the total number of users
    const totalUsers = await user.countDocuments();
    res.json({ users, totalUsers });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID." });
  }

  try {
    const deletedUser = await user.findOneAndDelete({ _id: id });

    if (!deletedUser) {
      return res.status(400).json({ error: "No such user" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getUsers,
  deleteUser,
};
