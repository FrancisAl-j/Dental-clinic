import React, { useState } from "react";
import "./createChart.css";
import axios from "axios";
import { teeth_data } from "../../../../TeethData";
import { toast } from "react-toastify";

const SubmitTeeth = ({ patient, setPatient }) => {
  const [teeth] = useState(teeth_data);
  //console.log(patient);

  const createDentalChart = async (e) => {
    e.preventDefault();
    const patientId = patient.patientId ? patient.patientId : patient._id;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/chart/create",
        {
          patientId,
          teeth,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success(
          `Dental chart created for patient: ${patient.patientName}`
        );
        setPatient(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //console.log(teeth);

  return (
    <form onSubmit={createDentalChart}>
      {patient && (
        <div className="patient-info">
          <p>{patient.patientName}</p>
          <p>{patient.patientAge}</p>

          <button>Create Chart</button>
        </div>
      )}
    </form>
  );
};

export default SubmitTeeth;
