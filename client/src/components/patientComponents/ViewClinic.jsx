import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setClinic,
  failClinic,
  clearClinic,
} from "../../redux/clinic/clinicReducer.js";
import { useEffect } from "react";
import axios from "axios";

const ViewClinic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentClinic } = useSelector((state) => state.clinic);

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/clinic/view/${id}`, {
          withCredentials: true,
        });
        console.log(res.data);

        dispatch(setClinic(res.data));
      } catch (error) {
        dispatch(failClinic(error));
      }
    };

    fetchClinic();
  }, [id, dispatch]);

  const handleBack = () => {
    dispatch(clearClinic());
    navigate("/clinics");
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <h1>{currentClinic.clinicName}</h1>
      <h3>{currentClinic.location}</h3>
      <span>{currentClinic.email}</span>
    </div>
  );
};

export default ViewClinic;
