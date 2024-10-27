import React, { useEffect, useState } from "react";
import "./createChart.css";
import axios from "axios";
import SubmitTeeth from "./SubmitTeeth";

const CreateChart = () => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(undefined);

  useEffect(() => {
    optionPatients();
  }, []);

  const optionPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/list/option", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setPatients(res.data);
        //console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePatientSelected = (e) => {
    const selectedPatient = patients.find(
      (patient) => patient._id === e.target.value
    );
    setPatient(selectedPatient);
  };

  console.log(patient);

  return (
    <div className="chart-container">
      <h1>Dental Chart</h1>
      <section className="chart-content">
        <select
          value={patient ? patient._id : ""}
          onChange={handlePatientSelected}
        >
          <option value="" disabled>
            Select a patient
          </option>
          {patients &&
            patients.map((patient, index) => {
              return (
                <option key={index} value={patient._id}>
                  {patient.patientName}
                </option>
              );
            })}
        </select>
        <SubmitTeeth patient={patient} setPatient={setPatient} />
      </section>
    </div>
  );
};

export default CreateChart;
