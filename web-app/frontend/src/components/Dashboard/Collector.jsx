import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";

function Collector() {
  const [collectorData, setCollectorData] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB here
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/collector-details"
        );
        setCollectorData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <br />
      <h3>Collector Details</h3>
      <table
        className="table table-striped table-bordered table-hover"
        style={style.table}
      >
        <thead>
          <tr>
            <th>Collector Name</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {collectorData.map((collector, index) => (
            <tr key={index}>
              <td>{collector.name}</td>
              <td>{collector.email}</td>
              <td>{collector.status}</td>
              <td>
                <FaTrash />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const style = {
  table: {
    tableLayout: "fixed",
  },
};

export default Collector;
