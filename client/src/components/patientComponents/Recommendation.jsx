import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./recommend.css";

const Recommendation = ({ id }) => {
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/recommendation/${id}`,
          {
            withCredentials: true,
          }
        );
        setRecommendation(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecommendation();
  }, [id]);
  return (
    <div>
      {recommendation.length === 0 ? (
        <></>
      ) : (
        <h1>Recommended Dental Services for you</h1>
      )}
      {!recommendation ? (
        <div></div>
      ) : (
        <div className="recommend-wrapper">
          {recommendation.map((rec) => {
            return (
              <div className="recommend-container" key={rec.service._id}>
                <img src={rec.service.imageLogo} alt="" />
                <div className="service-info">
                  <h1>{rec.service.name}</h1>
                  <p>{rec.service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Recommendation;
