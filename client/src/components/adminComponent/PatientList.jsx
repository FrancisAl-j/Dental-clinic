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

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        dispatch(getPatientStart());
        const res = await axios.get("http://localhost:5000/clinic/patients");
        if (res.status === 200) {
          dispatch(getPatientSuccess(res.data));
        }
      } catch (error) {
        setError("There was a problem fetching patients.");
      }
    };

    fetchPatients();
  }, [dispatch]);

  return (
    <div>
      <h1>Patient List</h1>
    </div>
  );
};

export default PatientList;
