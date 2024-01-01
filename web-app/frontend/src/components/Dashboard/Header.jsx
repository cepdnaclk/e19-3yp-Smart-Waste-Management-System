import React from "react";
import "./Dashboard.css";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

function Header({ OpenSidebar }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        {/* <>DASHBOARD</>&nbsp;&nbsp;&nbsp;&nbsp;
        <BsSearch className="icon" />
        &nbsp;&nbsp;
        <input className="search-text" type="text" placeholder=" Search" /> */}
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <BsFillEnvelopeFill className="icon" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default Header;
