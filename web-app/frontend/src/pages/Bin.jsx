import React from "react";
import "../components/Dashboard/Dashboard.css";
import Header from "../components/Dashboard/Header";
import Sidebar from "../components/Dashboard/Sidebar";
import BinComponet from "../components/Dashboard/BinComponet";

function Bin() {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <BinComponet />
    </div>
  );
}

export default Bin;
