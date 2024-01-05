const feedback = require("../models/feedback");

const getFeedback = async (req, res) => {
  try {
    const feedbacks = await feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback details:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getFeedback,
};
