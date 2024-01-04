import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Bin from "./pages/Bin";
import Collectors from "./pages/Collectors";
import Users from "./pages/Users";
import Feedback from "./pages/Feedback";
import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bins" element={<Bin />} />
          <Route path="/collectors" element={<Collectors />} />
          <Route path="/public-users" element={<Users />} />
          <Route path="/mapview" element={<Bin />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/settings" element={<Bin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
