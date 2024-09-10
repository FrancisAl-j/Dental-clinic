import "./getServices.css";
import axios from "axios";
import {
  getServicesStart,
  getServicesSuccess,
} from "../../../redux/clinic/services/servicesReducer.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar.jsx";

const GetServices = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const services = useSelector((state) => state.services.services);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        dispatch(getServicesStart());
        const res = await axios.get("http://localhost:5000/service/get", {
          withCredentials: true,
        });
        dispatch(getServicesSuccess(res.data));
      } catch (error) {
        setError("Something went wrong fetching the services");
      }
    };

    fetchServices();
  }, [dispatch]);
  return (
    <div className="services-wrapper">
      <Sidebar />

      <div className="services-content">
        <h1>Our Services</h1>
        <div className="services-container">
          {services.map((service) => {
            return (
              <Link key={service._id} to={`/service/${service._id}`}>
                <div>
                  <img src={service.imageLogo} alt="" />
                  <h1>{service.name}</h1>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GetServices;
