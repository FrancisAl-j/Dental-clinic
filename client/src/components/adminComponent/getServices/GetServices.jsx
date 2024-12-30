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

const GetServices = ({ setShow, setServiceId }) => {
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

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this service?")) {
        const res = await axios.delete(
          `http://localhost:5000/service/delete/${id}`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          toast.success("Service deleted");
        }
      }
    } catch (error) {
      toast.error("There was a problem deleting service");
    }
  };

  const clickUpdate = (id) => {
    setShow(true);
    setServiceId(id);
  };
  return (
    <div className="services-admin-wrapper">
      <Sidebar />

      <div className="services-content">
        <h1>Our Service</h1>
        <div>
          {services.map((service, index) => {
            return (
              <div className="services-container" key={index}>
                <img src={service.imageLogo} alt="" />
                <h1>{service.name}</h1>
                <div className="btn-actions">
                  <button
                    className="update"
                    onClick={() => clickUpdate(service._id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GetServices;
