import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        {" "}
        <br />
        <br />
        <div className="col-md-4 box" style={style.box}>
          <FontAwesomeIcon icon={faUsers} /> Users: 100
        </div>
        <div className="col-md-4 box" style={style.box}>
          <FontAwesomeIcon icon={faTrash} /> Bins: 50
        </div>
        <div className="col-md-4 box" style={style.box}>
          <FontAwesomeIcon icon={faStar} /> Rating: 4.5
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {" "}
          <br />
          <br />
          <h3>Bin's Status</h3>
          <table
            className="table table-striped table-bordered table-hover"
            style={style.table}
          >
            <thead>
              <tr>
                <th>Bin ID</th>
                <th>Filled Level</th>
                <th>Temperature</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>B001</td>
                <td>60 %</td>
                <td>27</td>
                <td>Open</td>
              </tr>
              <tr>
                <td>B002</td>
                <td>50 %</td>
                <td>25</td>
                <td>Open</td>
              </tr>
              <tr>
                <td>B003</td>
                <td>95 %</td>
                <td>27</td>
                <td>Close</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const style = {
  box: {
    width: "200px",
    height: "80px",
    backgroundColor: "green",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: "5px",
    margin: "10px",
  },
  table: {
    tableLayout: "fixed",
  },
};

export default Home;
