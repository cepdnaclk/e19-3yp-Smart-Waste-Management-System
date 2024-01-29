import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";

const socket = io("http://localhost:1337");
const height = 38;

function Home() {
  const [mqttData, setMqttData] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalBins, setTotalBins] = useState(null);
  const [totalCollectors, setTotalCollectors] = useState(null);

  useEffect(() => {
    socket.on("mqttData", (data) => {
      console.log("Received MQTT data:", data);
      setMqttData(data);
    });

    fetch("http://localhost:1337/api/user-details")
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.totalUsers);
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch("http://localhost:1337/api/bins")
      .then((response) => response.json())
      .then((data) => {
        setTotalBins(data.totalBins);
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch("http://localhost:1337/api/collector-details")
      .then((response) => response.json())
      .then((data) => {
        setTotalCollectors(data.totalCollectors);
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchMqttData();
  }, []);

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
  return (
    <div className="container-fluid">
      <h3 style={style.header}>Overview</h3>
      <div className="row">
        {" "}
        <br />
        <br />
        <div className="row justify-content-center">
          <div className="col-md-4 box" style={style.box}>
            <FontAwesomeIcon icon={faUsers} /> Users: {totalUsers}
          </div>
          <div className="col-md-4 box" style={style.box}>
            <FontAwesomeIcon icon={faTrash} /> Bins: {totalBins}
          </div>
          <div className="col-md-4 box" style={style.box}>
            <FontAwesomeIcon icon={faUsers} /> Collectors: {totalCollectors}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {" "}
          <br />
          <br />
          <h2 style={style.header}>Bin Status</h2>
          <table
            className="table table-striped table-bordered table-hover"
            style={style.table}
          >
            <thead>
              <tr>
                <th>BinID</th>
                <th>Filled_Level</th>
                <th>Temperature</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {mqttData ? (
                <tr>
                  <td>{mqttData.binId}</td>
                  <td>
                    {((mqttData.filledLevel / height) * 100).toFixed(2)} %
                  </td>
                  <td>{mqttData.temperature}</td>
                  <td>{mqttData.latitude}</td>
                  <td>{mqttData.longitude}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="5">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const style = {
  box: {
    width: "300px",
    height: "100px",
    backgroundColor: "green",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: "5px",
    margin: "10px",
    fontSize: "20px",
  },
  table: {
    tableLayout: "fixed",
  },
  header: {
    textAlign: "center",
    color: "darkgreen",
    fontSize: "24px",
    fontWeight: "bold",
    padding: "10px",
  },
  row: {
    backgroundColor: "#f2f2f2",
    textAlign: "center",
  },
};

export default Home;
