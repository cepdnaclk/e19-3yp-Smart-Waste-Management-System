const feedbacks = require("../models/feedback");

const postFeedback = async (req, res) => {
  const { name, title, feedback } = req.body;

  try {
    if (!name || !title || !feedback) {
      return res.status(400).json({ error: "All fields must be filled." });
    }

    const newFeedback = new feedbacks({
      name,
      title,
      feedback,
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error("Error posting feedback:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  postFeedback,
};
