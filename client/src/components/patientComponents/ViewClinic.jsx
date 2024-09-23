import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getClinic,
  clearClinic,
} from "../../redux/clinic/patientClinicReducer.js";
import axios from "axios";
import { Link } from "react-router-dom";
import Recommendation from "./Recommendation.jsx";
import "./viewClinic.css";
import Header from "./header/Header.jsx";
import MostVisitedServices from "./mostVisited/MostVisistedServices.jsx";

const ViewClinic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const clinic = useSelector((state) => state.patientClinic.clinic);

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/clinic/view/${id}`, {
          withCredentials: true,
        });

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

  return (
    <div className="container">
      {clinic && <Header clinic={clinic} />}
      <hr />

      <div className="container-background">
        <img src={clinic.background} alt="background" />
      </div>
      <MostVisitedServices id={clinic.id} />
      <Recommendation id={clinic.id} />

      <Link to={`/${clinic.id}/paginate/services`}>
        <button>Services</button>
      </Link>

      <h3>{clinic.location}</h3>

      <span>{clinic.email}</span>
    </div>
  );
};

export default ViewClinic;
