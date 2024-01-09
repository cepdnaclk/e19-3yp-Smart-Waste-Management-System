import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div className="container-fluid">
      <h3 style={style.header}>Overview</h3>
      <div className="row">
        {" "}
        <br />
        <br />
          <div className="row justify-content-center">
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
                <td>Closed</td>
              </tr>
              <tr>
                <td>B004</td>
                <td>95 %</td>
                <td>25</td>
                <td>Closed</td>
              </tr>
              <tr>
                <td>B005</td>
                <td>25 %</td>
                <td>27</td>
                <td>Open</td>
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
