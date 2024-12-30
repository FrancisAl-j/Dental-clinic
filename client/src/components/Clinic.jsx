import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../components/css/clinic.css";
import { useDispatch } from "react-redux";
import Sidebar from "./sidebar/Sidebar";
import axios from "axios";
import Profile from "../assets/profile.svg";
import Appointment from "../assets/appointment.svg";
import ActivityLogs from "./adminComponent/activityLogs/ActivityLogs.jsx";

const Clinic = ({ setPopUp }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentClinic } = useSelector((state) => state.clinic);
  const [total, setTotal] = useState(0);

  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [uniquePatients, setUniquePatients] = useState([]);
  const [totalAppointment, setTotalAppointments] = useState(0);
  const [employees, setEmployees] = useState(0);

  // This userEffect is for getting the data from appointment then posting/storing the necessary data to patientList
  useEffect(() => {
    fetchPatients();
  }, []);

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

  useEffect(() => {
    fetchTotalPatients();
    totalAppointments();
    fetchEmployees();
  }, []);

  const fetchTotalPatients = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/clinic/patients/${currentClinic._id}`
      );

      if (res.status === 200) {
        setTotal(res.data);
      }
      console.log(`total patients ${res.data}`);
    } catch (error) {
      console.log(error);
    }
  };

  const totalAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/clinic/appointments/${currentClinic._id}`
      );

      if (res.status === 200) {
        setTotalAppointments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/clinic/employees/${currentClinic._id}`
      );

      if (res.status === 200) {
        setEmployees(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="clinic-container">
      <Sidebar />
      {currentClinic && (
        <div className="clinic-content">
          <header>
            <img className="logo" src={currentClinic.logo} alt="logo" />
            <h1>{currentClinic.clinicName}</h1>
          </header>

          <div className="clinic-box">
            <div className="info-box">
              <img src={Profile} alt="" />
              <h3>Patients</h3>
              {total && <h4>{total}</h4>}
            </div>

            <div className="info-box">
              <img src={Appointment} alt="" />
              <h3>Appointments</h3>
              {totalAppointment && <h4>{totalAppointment}</h4>}
            </div>

            <div className="info-box">
              <img src={Profile} alt="" />
              <h3>Employees</h3>
              {employees && <h4>{employees}</h4>}
            </div>
          </div>

          <h1>Activity Logs</h1>
          <div className="activity-logs">
            <ActivityLogs />
          </div>
        </div>
      )}
    </div>
  );
};

export default Clinic;
