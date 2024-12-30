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
import { Link } from "react-router-dom";
import { teeth_data } from "../../TeethData.jsx";
import { toast } from "react-toastify";
import ShowMedicalHistory from "./showMedHistory/ShowMedicalHistory.jsx";

const PatientList = ({ setPopUp }) => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [patientId, setPatientId] = useState(null);
  const [teeth] = useState(teeth_data);
  const [patientID, setPatientID] = useState(null);

  // This useEffect get all the data from patientList to display in the web
  useEffect(() => {
    displayPatients();
  }, [query]);

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

  // Getting specific patient "id" to get the
  const handlePatientId = (e) => {
    const selectedPatientId = patients.find(
      (patient) => patient.patientId === e.target.value
    );
    setPatientId(selectedPatientId);
  };

  //console.log(patients);

  // Creating chart for patient
  const createDentalChart = async (e, id) => {
    e.preventDefault();
    const patientId = id;
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

  return (
    <div className="list-container">
      <Sidebar />

      <div className="list-content">
        <div className="actions">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Patient"
          />
          <button onClick={() => setPopUp(true)}>Add Patient</button>
        </div>

        <div className="patients-container">
          <p className="container-title">Name</p>
          <p className="container-title">Age</p>
          <p className="container-title">Gender</p>
          <p className="container-title">Email Adress</p>
          <p className="container-title">Contact Number</p>
          <p className="container-title">Actions</p>
          <p className="container-title">Chart</p>
        </div>
        <hr />
        <div>
          {patients.map((patient, index) => (
            <div className="patients-container" key={index}>
              <p
                className="patient-name"
                onClick={() => setPatientID(patient._id)}
              >
                {patient.patientName}
              </p>
              {patientID === patient._id && (
                <ShowMedicalHistory
                  id={patient._id}
                  name={patient.patientName}
                  setPatientID={setPatientID}
                  gender={patient.patientGender}
                />
              )}

              <p>{patient.patientAge}</p>
              <p>{patient.patientGender}</p>
              <p>{patient.patientEmail}</p>
              <p>+ 63 {patient.patientContact}</p>
              <div className="btns">
                <button
                  onClick={() =>
                    deletePatient(patient._id, patient.patientName)
                  }
                  className="delete-btn"
                >
                  Delete
                </button>
                <Link to={`/chart/${patient._id}`}>
                  <button className="chart-btn">Chart</button>
                </Link>
              </div>
              <button onClick={(e) => createDentalChart(e, patient._id)}>
                Create Chart
              </button>
            </div>
          ))}
        </div>

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default PatientList;
