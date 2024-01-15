import React, { useState } from "react";
import axios from "axios";

function ScheduleComponent() {
  const [location, setLocation] = useState("");
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
    <div>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <br />
      <label>
        Working Hours:
        <input
          type="number"
          value={workingHours.start}
          onChange={(e) =>
            setWorkingHours({
              ...workingHours,
              start: parseInt(e.target.value),
            })
          }
        />
        -
        <input
          type="number"
          value={workingHours.end}
          onChange={(e) =>
            setWorkingHours({ ...workingHours, end: parseInt(e.target.value) })
          }
        />
      </label>
      <br />
      <button onClick={handleScheduleTrip}>Schedule Collection Trip</button>
      <p>{responseMessage}</p>
    </div>
  );
}

export default ScheduleComponent;
