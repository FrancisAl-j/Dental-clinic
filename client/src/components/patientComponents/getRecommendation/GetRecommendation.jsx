import React, { useEffect, useState } from "react";
import axios from "axios";
import "./getRecommendation.css";

const GetRecommendation = ({ id }) => {
  const [recommendedServices, setRecommendedServices] = useState([]);

  useEffect(() => {
    getRecommended();
  }, []);

  const getRecommended = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/recommended-services/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setRecommendedServices(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //console.log("Recommended" + recommendedServices);

  return (
    <div className="services-recom-container">
      {recommendedServices.length !== 0 && <h1>Services you might like.</h1>}

      <div className="recommended-container">
        {recommendedServices &&
          recommendedServices.map((service, index) => {
            return (
              <div key={index} className="rec-wrapper">
                <img src={service.imageLogo} alt="" className="rec-image" />
                <h3 className="rec-name">{service.name}</h3>
                <h4 className="rec-desc">{service.description}</h4>
                <button>Visit</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GetRecommendation;
