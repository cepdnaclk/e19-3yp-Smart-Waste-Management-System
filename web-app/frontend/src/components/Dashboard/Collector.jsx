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

  const handleDelete = async (id) => {
    try {
      // Send a request to delete the collector with the specified ID
      await axios.delete(`http://localhost:1337/api/collector-details/${id}`);

      // Update the state to remove the deleted collector
      setCollectorData((prevData) =>
        prevData.filter((collector) => collector._id !== id)
      );
    } catch (error) {
      console.error("Error deleting collector:", error);
    }
  };

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
          {collectorData.map((collector) => (
            <tr key={collector._id}>
              <td>{collector.name}</td>
              <td>{collector.email}</td>
              <td>{collector.status}</td>
              <td>
                <FaTrash onClick={() => handleDelete(collector._id)} />
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
