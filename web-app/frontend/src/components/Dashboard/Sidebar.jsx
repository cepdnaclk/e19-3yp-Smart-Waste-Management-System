import React from "react";
import {
  BsFillPersonCheckFill,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { RiMapPinFill } from "react-icons/ri";

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const style = {
    link: {
      color: "#9e9ea4",
      textDecoration: "none",
    },
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsFillPersonCheckFill className="icon_header" /> Admin ID
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <a href="/dashboard" style={style.link}>
          <li className="sidebar-list-item">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </li>
        </a>
        <a href="/bins" style={style.link}>
          <li className="sidebar-list-item">
            <BsFillArchiveFill className="icon" /> Bins
          </li>
        </a>
        <a href="/collectors" style={style.link}>
          <li className="sidebar-list-item">
            <BsPeopleFill className="icon" /> Collectors
          </li>
        </a>
        <a href="/mapview" style={style.link}>
          <li className="sidebar-list-item">
            <RiMapPinFill className="icon" /> Map View
          </li>
        </a>
        <a href="/reports" style={style.link}>
          <li className="sidebar-list-item">
            <BsMenuButtonWideFill className="icon" /> Reports
          </li>
        </a>
        <a href="/settings" style={style.link}>
          <li className="sidebar-list-item">
            <BsFillGearFill className="icon" /> Settings
          </li>
        </a>
      </ul>
    </aside>
  );
};

export default Sidebar;
