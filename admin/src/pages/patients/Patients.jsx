import React, { useEffect, useState } from "react";
import "./patients.css";
import axios from "axios";
import DeletePatient from "./DeletePatient";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/get/patients"
      );

      if (res.status === 200) {
        setPatients(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateActive = async (e, id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/update/patient/${id}`,
        { active: e.target.value }
      );
      if (res.status === 200) {
        await fetchPatients();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="patients-container">
      <div className="patients-header">Patients</div>

      <div className="patients-content">
        {patients &&
          patients.map((patient, index) => {
            return (
              <div key={index}>
                <div className="patient-data">
                  <h2>{patient.username}</h2>
                  <h3>{patient.email}</h3>
                  <div className="actions">
                    <select
                      name="active"
                      id=""
                      value={patient.active}
                      onChange={(e) => updateActive(e, patient._id)}
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                    <button onClick={() => setPatientId(patient._id)}>
                      Delete
                    </button>
                  </div>
                </div>
                {patientId === patient._id && (
                  <DeletePatient
                    id={patient._id}
                    setPatientId={setPatientId}
                    name={patient.username}
                    fetchPatients={fetchPatients}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Patients;
