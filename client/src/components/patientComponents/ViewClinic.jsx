import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getClinic,
  clearClinic,
} from "../../redux/clinic/patientClinicReducer.js";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewClinic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const clinic = useSelector((state) => state.patientClinic.clinic);

  useEffect(() => {
    const fetchClinic = async () => {
      console.log("useEffect triggered");
      try {
        const res = await axios.get(`http://localhost:5000/clinic/view/${id}`, {
          withCredentials: true,
        });
        console.log(res.data);

        dispatch(getClinic(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchClinic();

    return () => {
      dispatch(clearClinic());
    };
  }, [id, dispatch]);

  if (!clinic) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  console.log(clinic.clinicName);
  const handleBack = () => {
    dispatch(clearClinic());
    navigate("/clinics");
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <h1>{clinic.clinicName}</h1>
      <h3>{clinic.location}</h3>
      <span>{clinic.email}</span>
      <Link to="/clinic/:id/:name/appointment">
        <button>Book an appointment</button>
      </Link>
    </div>
  );
};

export default ViewClinic;
