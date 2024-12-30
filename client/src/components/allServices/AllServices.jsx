import React, { useEffect, useState } from "react";
import "./allServices.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllServices = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  let fetchServices;
  if (currentUser) {
    fetchServices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/sorted/services",
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setServices(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    fetchServices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/service/all/services",
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setServices(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }

  console.log(services);

  //console.log(services);

  return (
    <div className="all-services-container">
      <header className="all-services-header">All Services</header>
      <div className="services-menu grid">
        <h2>Image</h2>
        <h2>Name</h2>
        <h2>Details</h2>
      </div>
      <div className="all-services-content">
        {services &&
          services.map((service, index) => {
            return (
              <div className="all-service-container grid" key={index}>
                <img src={service.imageLogo} alt="" />
                <h3>{service.name}</h3>

                {service.clinicId && (
                  <div className="services-details">
                    <span>
                      <b>Clinic:</b> {service.clinicId.clinicName}
                    </span>
                    <span>
                      <b>Address:</b> {service.clinicId.location}
                    </span>
                    {currentUser ? (
                      <Link
                        to={`/clinic/${service.clinicId._id}/${service.clinicId.clinicName}`}
                      >
                        <button>Visit Clinic</button>
                      </Link>
                    ) : (
                      <span className="unable">
                        Sign in to visit the clinic
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllServices;
