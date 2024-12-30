import React from "react";
import "./clinics.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DeleteClinic from "./DeleteClinic";

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [clinicId, setClinicId] = useState(null);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/get/clinics"
      );

      if (res.status === 200) {
        setClinics(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update active status
  const updateClinic = async (e, id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/update/clinic/${id}`,
        { active: e.target.value }
      );

      if (res.status === 200) {
        await fetchClinics();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="clinics-container">
      <div className="clinics-header">Clinics</div>
      <div className="clinic-container">
        <h2>Name</h2>
        <h2>Email</h2>
        <h2>Address</h2>
        <h2>Business TIN</h2>
        <h2>Actions</h2>
      </div>
      <div className="clinics-content">
        {clinics &&
          clinics.map((clinic, index) => {
            return (
              <div key={index}>
                <div className="clinic-container">
                  <h2>{clinic.clinicName}</h2>
                  <h3>{clinic.email}</h3>
                  <p>{clinic.location}</p>
                  <p>{clinic.tin}</p>
                  <div className="actions">
                    <select
                      name="active"
                      id=""
                      value={clinic.active}
                      onChange={(e) => updateClinic(e, clinic._id)}
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                    <button onClick={() => setClinicId(clinic._id)}>
                      Delete
                    </button>
                  </div>
                </div>
                {clinicId === clinic._id && (
                  <DeleteClinic
                    id={clinicId}
                    setClinicId={setClinicId}
                    name={clinic.clinicName}
                    fetchClinics={fetchClinics}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Clinics;
