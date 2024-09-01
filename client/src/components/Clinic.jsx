import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../components/css/clinic.css";
import { useDispatch } from "react-redux";
import axios from "axios";

const Clinic = ({ setPopUp }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentClinic } = useSelector((state) => state.clinic);

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
  }, []);

  return (
    <div className="clinic-container">
      <div className="clinic-nav">
        <ul>
          <Link to="/clinic-delete">
            <li>Update your clinic</li>
          </Link>
          <Link to="/clinic/appointment-list">
            <li>Appointment List</li>
          </Link>
          <Link to="/patients">
            <li>Patient list</li>
          </Link>
          {currentUser && currentUser.role === "Admin" && (
            <Link to="/create-assistant">
              <li>Create Employees</li>
            </Link>
          )}

          {currentUser && currentUser.role === "Admin" && (
            <Link to="/chart">
              <li>Dental Chart</li>
            </Link>
          )}
        </ul>
      </div>

      <div className="clinic-content">
        <header>
          <img className="logo" src={currentClinic.logo} alt="logo" />
          <h1>{currentClinic.clinicName}</h1>
          <button onClick={() => setPopUp(true)}>Add Patient</button>
        </header>

        <p>{currentClinic.email}</p>
      </div>
    </div>
  );
};

export default Clinic;
