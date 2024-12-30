import React, { useEffect, useState } from "react";
import "./clinicServices.css";
import axios from "axios";

const ClinicServices = ({ id }) => {
  const [clinicServices, setClinicServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  console.log(id);

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/service/clinic/services",
        {
          params: {
            clinicId: id,
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setClinicServices(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //console.log("services: " + clinicServices);

  return (
    <div className="clinic-services">
      <h1 className="big-title">OUR SERVICES</h1>
      <div className="clinic-services-content">
        {clinicServices &&
          clinicServices.map((service, index) => {
            return (
              <div className="ser-name" key={index}>
                {service.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ClinicServices;
