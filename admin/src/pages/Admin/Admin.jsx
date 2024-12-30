import React from "react";
import "./admin.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DeleteAdmin from "./DeleteAdmin";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/get/admins");

      if (res.status === 200) {
        setAdmins(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update Active status
  const updateActive = async (e, id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/update/admin/${id}`,
        { active: e.target.value }
      );
      if (res.status === 200) {
        await fetchAdmins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Deleting Admin

  return (
    <div className="admins-container">
      <div className="header-admin">Admin/Dentist</div>

      <div className="admins-content">
        <div className="clinic-container">
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>Clinic</h2>
          <h2>Actions</h2>
        </div>
        {admins &&
          admins.map((admin, index) => {
            return (
              <div key={index}>
                <div className="admin-data">
                  <h2>{admin.name}</h2>
                  <h3>{admin.email}</h3>
                  <h3>{admin.clinicId && admin.clinicId.clinicName}</h3>
                  <div className="actions">
                    <select
                      name="active"
                      id=""
                      value={admin.active}
                      onChange={(e) => updateActive(e, admin._id)}
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                    <button type="button" onClick={() => setAdminId(admin._id)}>
                      Delete
                    </button>
                  </div>
                </div>
                {adminId === admin._id && (
                  <DeleteAdmin
                    name={admin.name}
                    setAdminId={setAdminId}
                    id={admin._id}
                    fetchAdmins={fetchAdmins}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Admin;
