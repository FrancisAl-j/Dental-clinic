import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPatientStart,
  getPatientSuccess,
  deletePatient,
} from "../../redux/clinic/patientListReducer.js";
import Sidebar from "../sidebar/Sidebar.jsx";
import axios from "axios";

import "./patientList.css";

const PatientList = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // This useEffect get all the data from patientList to display in the web
  useEffect(() => {
    displayPatients();
  }, []);

  const displayPatients = async () => {
    try {
      dispatch(getPatientStart());
      const res = await axios.get("http://localhost:5000/list/patient-list", {
        params: { query },
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

  const deletePatient = async (id, name) => {
    try {
      if (window.confirm(`Are you sure you want to delete? ${name}`)) {
        const res = await axios.delete(
          `http://localhost:5000/list/delete/${id}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          //dispatch(deletePatient());
          await displayPatients();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-container">
      <Sidebar />

      <div className="list-content">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for Patient"
        />
        <div className="patients-container">
          <p className="container-title">Name</p>
          <p className="container-title">Age</p>
          <p className="container-title">Gender</p>
          <p className="container-title">Email Adress</p>
          <p className="container-title">Contact Number</p>
          <p className="container-title">Actions</p>
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
              <div className="btns">
                <button
                  onClick={() =>
                    deletePatient(patient._id, patient.patientName)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default PatientList;
