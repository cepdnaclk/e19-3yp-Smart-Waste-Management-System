import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";

function PublicUser() {
  const [UserData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB here
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/user-details"
        );
        setUserData(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Send a request to delete the users with the specified ID
      await axios.delete(`http://localhost:1337/api/user-details/${id}`);

      // Update the state to remove the deleted users
      setUserData((prevData) => prevData.filter((users) => users._id !== id));
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  return (
    <div>
      <br />
      <h3 style={style.header}>Users</h3>
      <table
        className="table table-striped table-bordered table-hover"
        style={style.table}
      >
        <thead>
          <tr>
            <th style={style.label}>User's Name</th>
            <th style={style.label}>E-mail</th>
            <th style={style.label}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {UserData.map((users) => (
            <tr key={users._id}>
              <td>{users.name}</td>
              <td>{users.email}</td>
              <td>
                <FaTrash onClick={() => handleDelete(users._id)} />
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
    margin: "10px",
    width: "98%",
    borderCollapse: "collapse",
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
};

export default PublicUser;
