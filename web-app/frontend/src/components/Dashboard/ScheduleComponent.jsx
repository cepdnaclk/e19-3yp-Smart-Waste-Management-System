import React, { useState } from "react";
import axios from "axios";
import "./schedule.css";
function ScheduleComponent() {
  const [location, setLocation] = useState("Peradeniya");
  const [workingHours, setWorkingHours] = useState({ start: 8, end: 17 });
  const [responseMessage, setResponseMessage] = useState("");

  const handleScheduleTrip = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1337/api/scheduleCollection",
        {
          location,
          workingHours,
        }
      );

      setResponseMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setResponseMessage("Error scheduling collection trip.");
    }
  };

  return (
    <div className="container">
      <label className="label">
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input"
        />
      </label>
      <br />
      <label className="label">
        Working Hours:
        <input
          type="number"
          max={23}
          min={0}
          value={workingHours.start}
          onChange={(e) =>
            setWorkingHours({
              ...workingHours,
              start: parseInt(e.target.value),
            })
          }
          className="input"
        />
        -
        <input
          type="number"
          max={23}
          min={0}
          value={workingHours.end}
          onChange={(e) =>
            setWorkingHours({ ...workingHours, end: parseInt(e.target.value) })
          }
          className="input"
        />
      </label>
      <br />
      <button onClick={handleScheduleTrip} className="button">
        Generate Schedule
      </button>
      <p className="response">{responseMessage}</p>
    </div>
  );
}

export default ScheduleComponent;
