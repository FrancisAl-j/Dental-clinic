import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Admin from "./pages/Admin/Admin";
import Dashboard from "./pages/dashboard/Dashboard";
import Clinics from "./pages/clinics/Clinics";
import Patients from "./pages/patients/Patients";

const App = () => {
  return (
    <main>
      <Nav />

      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admins" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
