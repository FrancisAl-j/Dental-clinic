import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPatientStart,
  getPatientSuccess,
} from "../../redux/clinic/patientListReducer.js";
import axios from "axios";

import "./patientList.css";

const PatientList = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // This useEffect get all the data from patientList to display in the web
  useEffect(() => {
    const displayPatients = async () => {
      try {
        dispatch(getPatientStart());
        const res = await axios.get("http://localhost:5000/list/patient-list", {
          withCredentials: true,
        });
        if (res.status === 200) {
          dispatch(getPatientSuccess(res.data));
        } else {
          console.error("Unexpected status:", res.status);
          setError("There was a problem fetching patients.");
        }
      } catch (error) {
        console.log(error);

        setError("There was a problem fetching patients.");
      }
    };

    displayPatients();
  }, [dispatch]);

  return (
    <div>
      <div className="patients-container">
        <p className="container-title">Name</p>
        <p className="container-title">Age</p>
        <p className="container-title">Gender</p>
        <p className="container-title">Email Adress</p>
        <p className="container-title">Contact Number</p>
      </div>
      <hr />
      <div>
        {patients.map((patient, index) => (
          <div className="patients-container" key={index}>
            <p>{patient.patientName}</p>
            <p>{patient.patientAge}</p>
            <p>{patient.patientGender}</p>
            <p>{patient.patientEmail}</p>
            <p>{patient.patientContact}</p>
          </div>
        ))}
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};

export default PatientList;
