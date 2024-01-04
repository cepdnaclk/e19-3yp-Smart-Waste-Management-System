import React from "react";
import "../components/Dashboard/Dashboard.css";
import Header from "../components/Dashboard/Header";
import Sidebar from "../components/Dashboard/Sidebar";
import PublicUser from "../components/Dashboard/PublicUser";

function Users() {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <PublicUser />
    </div>
  );
}

export default Users;
