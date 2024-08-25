import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPatientStart,
  getPatientSuccess,
} from "../../redux/clinic/patientListReducer";
import axios from "axios";

const PatientList = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [uniquePatients, setUniquePatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        dispatch(getPatientStart());
        const res = await axios.get("http://localhost:5000/clinic/patient", {
          withCredentials: true,
        });
        if (res.status === 200) {
          const appointments = res.data;
          setAppointments(appointments);

          const patientMap = new Map();
          appointments.forEach((appointment) => {
            const { patientId, patientName, patientAge, patientGender } =
              appointment;
            if (patientName && !patientMap.has(patientId)) {
              patientMap.set(patientId, {
                patientName,
                patientAge,
                patientGender,
              });
            }
          });

          const uniquePatientsList = Array.from(patientMap.values());
          setUniquePatients(uniquePatientsList);
          dispatch(getPatientSuccess(uniquePatientsList));
        }
      } catch (error) {
        setError("There was a problem fetching patients.");
      }
    };

    fetchPatients();
  }, [dispatch]);

  return (
    <div>
      <h1>Patients</h1>
      <div className="patients-container">
        {uniquePatients.map((patient, index) => {
          return (
            <div key={index}>
              <p>{patient.patientName}</p>
              <p>Age: {patient.patientAge}</p>
              <p>Gender: {patient.patientGender}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientList;
