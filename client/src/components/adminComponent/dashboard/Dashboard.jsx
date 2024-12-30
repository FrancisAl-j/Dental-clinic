import React from "react";
import "./dashboard.css";
import Sidebar from "../../sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content"></div>
    </div>
  );
};

export default Dashboard;
