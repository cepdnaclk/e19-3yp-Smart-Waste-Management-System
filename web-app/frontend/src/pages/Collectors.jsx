import React from "react";
import "../components/Dashboard/Dashboard.css";
import Header from "../components/Dashboard/Header";
import Sidebar from "../components/Dashboard/Sidebar";
import Collector from "../components/Dashboard/Collector";

function Collectors() {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <Collector />
    </div>
  );
}

export default Collectors;
