const axios = require("axios");

const Schedule = async (req, res) => {
  try {
    const { location, workingHours } = req.body;

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
    if (!isRaining && isWorkingHours(workingHours)) {
      // Schedule waste collection trip
      // You can add your logic here for scheduling the trip

      res.json({
        status: "success",
        message: "Collection trip scheduled successfully.",
        latitude: lat,
        longitude: lon,
      });
    } else {
      res.json({
        status: "error",
        message: "Cannot schedule collection trip at this time.",
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

module.exports = { Schedule };
