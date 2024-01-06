import React from "react";
import "./Dashboard.css";
import { BsJustify } from "react-icons/bs";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

function Header({ OpenSidebar }) {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left"></div>
      <div className="header-right">
        {user && user.email && (
          <>
            <span
              style={{
                padding: "10px",
                fontSize: "18px",
              }}
            >
              <i>{user.email}</i>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              style={{
                backgroundColor: "#f44336",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "16px",
              }}
              onClick={handleClick}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
