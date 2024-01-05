import React from "react";
import "../components/Dashboard/Dashboard.css";
import Header from "../components/Dashboard/Header";
import Sidebar from "../components/Dashboard/Sidebar";
import Feedbacks from "../components/Dashboard/FeedbackComponent";

function Feedback() {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <Feedbacks />
    </div>
  );
}

export default Feedback;
