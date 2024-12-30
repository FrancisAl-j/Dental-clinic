import { useParams } from "react-router-dom";
import "./viewService.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import axios from "axios";
import {
  getClinic,
  clearClinic,
} from "../../../redux/clinic/patientClinicReducer.js";
import {
  patientGetServiceStart,
  patientGetServiceSuccess,
  patientClearService,
} from "../../../redux/clinic/services/serviceReducer.js";
import { Link } from "react-router-dom";

const ViewService = () => {
  const dispatch = useDispatch();
  const clinic = useSelector((state) => state.patientClinic.clinic);
  const service = useSelector((state) => state.service.service);
  const { clinicId, id, name } = useParams();

  console.log(service);

  useEffect(() => {
    const loadData = async () => {
      await fetchClinic();
      await fetchService();
    };

    loadData();

    return () => {
      dispatch(clearClinic());
      dispatch(patientClearService());
    };
  }, [dispatch]);

  const fetchClinic = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/clinic/view/${clinicId}`,
        {
          withCredentials: true,
        }
      );

      dispatch(getClinic(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchService = async () => {
    try {
      dispatch(patientGetServiceStart());
      const res = await axios.get(`http://localhost:5000/service/fetch/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(patientGetServiceSuccess(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {clinic && <Header clinic={clinic} />}
      <hr />
      <div className="service-headers">
        <img src={service.bgImage} alt="" className="bg-headers" />
        <div className="service-name-containers">
          <div className="name-wrappers">
            <img src={service.imageLogo} alt="" className="image-logo" />
            <h3>{service.name}</h3>
          </div>
          <Link to={`/clinic/${clinicId}/${name}/appointment/${service.name}`}>
            <button>Book an appointment</button>
          </Link>
        </div>
      </div>
      <h1>{service.name}</h1>
    </div>
  );
};

export default ViewService;
