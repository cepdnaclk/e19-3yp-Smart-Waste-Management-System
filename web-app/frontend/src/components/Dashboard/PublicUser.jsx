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
        setUserData(response.data);
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
      <h3>Public users Details</h3>
      <table
        className="table table-striped table-bordered table-hover"
        style={style.table}
      >
        <thead>
          <tr>
            <th>User's Name</th>
            <th>E-mail</th>
            <th>Delete</th>
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
  },
};

export default PublicUser;
