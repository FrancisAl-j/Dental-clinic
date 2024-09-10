import { useEffect, useState } from "react";
import "./getService.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  getServiceStart,
  getServiceSuccess,
  clearService,
} from "../../../redux/clinic/services/serviceReducer.js";
import { useDispatch, useSelector } from "react-redux";

const GetService = ({ setShow }) => {
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.service);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/service/get/${id}`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          dispatch(getServiceSuccess(res.data));
        }
      } catch (error) {
        setError("Something went wrong fetching service");
      }
    };

    fetchService();

    return () => {
      dispatch(clearService());
    };
  }, [id, dispatch]);

  return (
    <div>
      <div className="service-header">
        <h1>{service.name}</h1>
        <div className="service-btn">
          <button className="update" onClick={() => setShow(true)}>
            Update Service
          </button>
          <button className="delete">Delete Service</button>
        </div>
      </div>
      <section className="background">
        <img src={service.bgImage} alt="" />
        <button>Book an appointment now!</button>
      </section>
    </div>
  );
};

export default GetService;
