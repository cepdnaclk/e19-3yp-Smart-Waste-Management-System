const axios = require("axios");
const ScheduleModel = require("../models/schedule");

const Schedule = async (req, res) => {
  try {
    const { location, workingHours, collectorID, collectBin } = req.body;

    // Check weather using a weather API (replace API_KEY with your actual API key)
    const apiKey = "19820d37516af741113fe71e62198c50";
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    );

    // Extract latitude and longitude from the API response
    const { lat, lon } = weatherResponse.data.coord;

    const isRaining =
      weatherResponse.data.weather[0].main.toLowerCase() === "rain";

    // Check if it's not raining and within working hours
    if (isWorkingHours(workingHours)) {
      if (!isRaining) {
        // Schedule waste collection trip
        const newSchedule = new ScheduleModel({
          date: new Date(),
          collectorID: collectorID,
          collectBin: collectBin,
        });

        // Save the new schedule to MongoDB
        await newSchedule.save();

        res.json({
          status: "success",
          message: "Collection trip scheduled successfully.",
          latitude: lat,
          longitude: lon,
        });
      } else {
        res.json({
          status: "error",
          message: "It's raining outside!",
        });
      }
    } else {
      res.json({
        status: "error",
        message: "It's not a working hour right now!",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
};

function isWorkingHours(workingHours) {
  const currentHour = new Date().getHours();
  return currentHour >= workingHours.start && currentHour <= workingHours.end;
}

const getSchedule = async (req, res) => {
  try {
    // Fetch all schedule entries from the MongoDB collection
    const scheduleEntries = await ScheduleModel.find();
    res.json(scheduleEntries);
  } catch (error) {
    console.error("Error fetching schedule details:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { Schedule, getSchedule };
