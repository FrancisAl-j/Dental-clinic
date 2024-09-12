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

const ViewService = () => {
  const dispatch = useDispatch();
  const clinic = useSelector((state) => state.patientClinic.clinic);
  const service = useSelector((state) => state.service.service);
  const { clinicId, id, name } = useParams();

  useEffect(() => {
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

    fetchClinic();

    return () => {
      dispatch(clearClinic());
    };
  }, [clinicId, dispatch]);

  useEffect(() => {
    fetchService();

    return () => {
      dispatch(patientClearService());
    };
  }, [id, dispatch]);

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
      <h1>{service.name}</h1>
    </div>
  );
};

export default ViewService;
