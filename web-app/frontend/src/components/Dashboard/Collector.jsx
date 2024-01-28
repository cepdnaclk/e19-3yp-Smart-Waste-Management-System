import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";

function Collector() {
  const [collectorData, setCollectorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/collector-details"
        );
        if (response.ok) {
          const CollectorData = await response.json();
          setCollectorData(CollectorData.collectors);
        } else {
          console.error("Failed to fetch collectors:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching collectors:", error);
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

  const handleUpdateStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === true ? false : true;

      // Send a request to update the collector status
      await axios.put(`http://localhost:1337/api/collector-details/${id}`, {
        activeAccount: newStatus,
      });

      // Update the state to reflect the updated status
      setCollectorData((prevData) =>
        prevData.map((collector) =>
          collector._id === id
            ? { ...collector, activeAccount: newStatus }
            : collector
        )
      );
    } catch (error) {
      console.error("Error updating collector status:", error);
    }
  };

  return (
    <div>
      <br />
      <h3 style={style.header}>Garbage Collectors</h3>
      <table
        className="table table-striped table-bordered table-hover"
        style={style.table}
      >
        <thead>
          <tr>
            <th style={style.label}>Collector Name</th>
            <th style={style.label}>E-mail</th>
            <th style={style.label}>Account status</th>
            <th style={style.label}>Actions</th>
            <th style={style.label}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collectorData.map((collector) => (
            <tr key={collector._id}>
              <td>{collector.name}</td>
              <td>{collector.email}</td>
              <td>{collector.activeAccount ? "Active" : "Not Active"}</td>{" "}
              {/* Update this line */}
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleUpdateStatus(collector._id, collector.activeAccount)
                  }
                >
                  Active/Not Active
                </button>
              </td>
              <td>
                {" "}
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
    width: "98%",
    borderCollapse: "collapse",
    margin: "10px",
  },
  header: {
    textAlign: "center",
    color: "darkgreen",
    fontSize: "24px",
    fontWeight: "bold",
    padding: "10px",
  },
  label: {
    fontWeight: "bold",
    color: "#4CAF50",
    minWidth: "80px",
  },
  row: {
    backgroundColor: "#f2f2f2",
  },
  cell: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  actionButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    cursor: "pointer",
  },
  deleteIcon: {
    color: "#dc3545",
    cursor: "pointer",
  },
};

/*
const style = {
  table: {
    tableLayout: "fixed",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
};
*/
export default Collector;
