import React, { useEffect, useState } from "react";
import "./mostVisited.css";
import axios from "axios";
import Top from "../../../assets/fire.svg";

const MostVisitedServices = ({ id }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchMostVistedServices();
  }, []);

  const fetchMostVistedServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/top/services", {
        params: {
          clinicId: id,
        },
        withCredentials: true,
      });
      if (res.status === 200) {
        setServices(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {services.length !== 0 && (
        <div className="most-container">
          {services.length === 1 ? <h1>Top Service</h1> : <h1>Top Services</h1>}

          <div className="most-wrapper">
            {services.map((service, index) => {
              return (
                <div key={index} className="most-service-container">
                  <img src={service.imageLogo} alt="" className="logo" />
                  <div>
                    <span className="most-name">{service.name}</span>
                  </div>
                  <img src={Top} alt="" className="fire" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MostVisitedServices;
