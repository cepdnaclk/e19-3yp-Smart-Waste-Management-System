import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./schedule.css";

function ScheduleComponent() {
  const [location, setLocation] = useState("Peradeniya");
  const [workingHours, setWorkingHours] = useState({ start: 8, end: 17 });
  const [collectors, setCollectors] = useState([]);
  const [selectedCollector, setSelectedCollector] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    // Fetch collectors when the component mounts
    fetchCollectors();
    // Fetch schedule when the component mounts
    fetchSchedule();
  }, []);

  const fetchCollectors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/collector-details"
      );
      setCollectors(response.data);
    } catch (error) {
      console.error("Error fetching collectors:", error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/scheduleCollection"
      );
      setSchedule(response.data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const handleScheduleTrip = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1337/api/scheduleCollection",
        {
          location,
          workingHours,
          collectorID: selectedCollector,
        }
      );

      setResponseMessage(response.data.message);

      // Fetch the updated schedule after scheduling the trip
      fetchSchedule();
    } catch (error) {
      console.error(error);
      setResponseMessage("Error scheduling collection trip.");
    }
  };

  return (
    <div>
      <div className="container">
        <br />
        <br />
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
              setWorkingHours({
                ...workingHours,
                end: parseInt(e.target.value),
              })
            }
            className="input"
          />
        </label>
        <br />
        <label className="label">
          Select Collector:
          <select
            value={selectedCollector}
            onChange={(e) => setSelectedCollector(e.target.value)}
            className="input"
          >
            <option value="" disabled>
              -- Select Collector --
            </option>
            {collectors.map((collector) => (
              <option key={collector._id} value={collector._id}>
                {collector.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button onClick={handleScheduleTrip} className="btn btn-primary">
          Generate Schedule
        </button>
        <p className="response">{responseMessage}</p>
      </div>

      {schedule && (
        <div className="schedule-table">
          <h2 className="title">Scheduled Table</h2>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Date</th>
                <th>Collector ID</th>
                {/* <th>Collection Bin</th> */}
              </tr>
            </thead>
            <tbody>
              {schedule.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.date}</td>
                  <td>{entry.collectorID}</td>
                  {/* <td>{entry.collectBin}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ScheduleComponent;
