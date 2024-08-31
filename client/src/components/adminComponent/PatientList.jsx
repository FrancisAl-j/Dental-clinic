import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPatientStart,
  getPatientSuccess,
} from "../../redux/clinic/patientListReducer";
import axios from "axios";

import "./patientList.css";

const PatientList = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [uniquePatients, setUniquePatients] = useState([]);

  // This userEffect is for getting the data from appointment then posting/storing the necessary data to patientList
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/clinic/patient", {
          withCredentials: true,
        });

        if (res.status === 200) {
          const appointmentsData = res.data;
          setAppointments(appointmentsData);

          // Creating a map to store unique patients by patientId
          const patientMap = new Map();
          appointmentsData.forEach((appointment) => {
            const {
              patientId,
              patientName,
              patientAge,
              patientGender,
              patientEmail,
              patientContact,
              clinicId,
            } = appointment;

            if (patientName && !patientMap.has(patientId)) {
              patientMap.set(patientId, {
                patientName,
                patientAge,
                patientGender,
                patientEmail,
                patientContact,
                clinicId,
                patientId,
              });
            }
          });

          // Convert the map values to an array of unique patients
          const uniquePatientsList = Array.from(patientMap.values());
          setUniquePatients(uniquePatientsList);
          console.log(uniquePatientsList);

          // Send the unique patients to the backend
          await axios.post(
            "http://localhost:5000/list/patients",
            uniquePatientsList, // This is the array of patients
            {
              withCredentials: true,
            }
          );
        }
      } catch (error) {
        setError("There was a problem fetching patients.");
      }
    };

    fetchPatients();
  }, [dispatch]);

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
        }
      } catch (error) {
        setError("There was a problem fetching patients.");
      }
    };

    displayPatients();
  }, [dispatch]);

  return (
    <div>
      <div className="patients-container">
        <p>Name</p>
        <p>Age</p>
        <p>Gender</p>
        <p>Email Adress</p>
        <p>Contact Number</p>
      </div>
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
