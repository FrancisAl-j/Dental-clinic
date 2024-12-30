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
import GetRecommendation from "./getRecommendation/GetRecommendation.jsx";
import ClinicServices from "./clinicServices/ClinicServices.jsx";

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

  // <Recommendation id={clinic.id} />

  return (
    <div className="container">
      {clinic && <Header clinic={clinic} />}
      <hr />

      <div className="container-background">
        <img src={clinic.background} alt="background" />
        <div className="view-details">
          <h3 className="clinic-details">{clinic.details}</h3>
          <div className="important-details">
            <h3 className="view-address">{clinic.location}</h3>
            <span className="view-contact">{clinic.contact}</span>
            <span className="view-email">{clinic.email}</span>
          </div>
        </div>
      </div>
      <GetRecommendation id={clinic.id} />
      <MostVisitedServices id={clinic.id} />

      <ClinicServices id={clinic.id} />
    </div>
  );
};

export default ViewClinic;
