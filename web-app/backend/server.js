const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 5000;

// express app
const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "welcome to the app" });
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
