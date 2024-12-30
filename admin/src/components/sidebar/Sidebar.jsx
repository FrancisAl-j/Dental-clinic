import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/admins" className="sidebar-option">
          <p>Admins</p>
        </NavLink>

        <NavLink to="/clinics" className="sidebar-option">
          <p>Clinics</p>
        </NavLink>

        <NavLink to="/patients" className="sidebar-option">
          <p>Patients</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
