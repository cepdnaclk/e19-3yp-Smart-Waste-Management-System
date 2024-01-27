import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Bin from "./pages/Bin";
import Collectors from "./pages/Collectors";
import Users from "./pages/Users";
import Feedback from "./pages/Feedback";
import Map from "./pages/Map";
import Schedule from "./pages/Schedule";
import "./App.css";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/bins" element={<Bin />} />
          <Route path="/collectors" element={<Collectors />} />
          <Route path="/public-users" element={<Users />} />
          <Route path="/mapview" element={<Map />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/dashboard" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/bins"
//             element={user ? <Bin /> : <Navigate to="/login" replace />}
//             exact
//           />
//           <Route
//             path="/collectors"
//             element={user ? <Collectors /> : <Navigate to="/login" replace />}
//             exact
//           />
//           <Route
//             path="/public-users"
//             element={user ? <Users /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/mapview"
//             element={user ? <Map /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/feedback"
//             element={user ? <Feedback /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/schedule"
//             element={user ? <Schedule /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/dashboard"
//             element={user ? <Dashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/login"
//             element={!user ? <Login /> : <Navigate to="/dashboard" />}
//           />
//           <Route
//             path="/register"
//             element={!user ? <Register /> : <Navigate to="/dashboard" />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;
