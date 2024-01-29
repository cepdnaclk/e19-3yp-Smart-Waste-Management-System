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
  const [mqttData, setMqttData] = useState(null);

  useEffect(() => {
    fetchCollectors();
    fetchSchedule();
    fetchMqttData(); // Fetch MQTT data on component mount
  }, []);

  const fetchCollectors = async () => {
    try {
      const response = await fetch(
        "http://localhost:1337/api/collector-details"
      );
      if (response.ok) {
        const CollectorData = await response.json();
        setCollectors(CollectorData.collectors);
      } else {
        console.error("Failed to fetch collectors:", response.statusText);
      }
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

  const fetchMqttData = async () => {
    try {
      const response = await fetch("http://localhost:1337/iot/subscribe");
      if (!response.ok) {
        throw new Error("Failed to fetch MQTT data");
      }
      const data = await response.json();
      setMqttData(data);
    } catch (error) {
      console.error("Error fetching MQTT data:", error);
    }
  };

  const handleScheduleTrip = async () => {
    try {
      // Check if mqttData exists and filledLevel is higher than 30
      if (mqttData && mqttData.filledLevel > 30) {
        const response = await axios.post(
          "http://localhost:1337/api/scheduleCollection",
          {
            location,
            workingHours,
            collectorID: selectedCollector,
          }
        );
        setResponseMessage(response.data.message);
        fetchSchedule(); // Fetch the updated schedule after scheduling the trip
      } else {
        setResponseMessage("Cannot schedule trip: Bins are not filled.");
      }
    } catch (error) {
      console.error("Error scheduling collection trip:", error);
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
