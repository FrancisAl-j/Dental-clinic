import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./recommend.css";
import { Link } from "react-router-dom";
import {
  getRecommendationsStart,
  getRecommendationsSuccess,
  clearRecommendations,
} from "../../redux/clinic/recommendation/recommendationReducer.js";

const Recommendation = ({ id }) => {
  const dispatch = useDispatch();
  const recommendation = useSelector(
    (state) => state.recommendations.recommendations
  );

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        dispatch(getRecommendationsStart());
        const res = await axios.get(
          `http://localhost:5000/api/recommendation/${id}`,
          {
            withCredentials: true,
          }
        );
        // Ensure to only dispatch recommendations if they exist
        if (res.data && res.data.length > 0) {
          dispatch(getRecommendationsSuccess(res.data));
        } else {
          // Clear recommendations if there are no valid services
          dispatch(clearRecommendations());
        }
      } catch (error) {
        console.log(error);
        dispatch(clearRecommendations());
      }
    };

    fetchRecommendation();

    return () => {
      dispatch(clearRecommendations());
    };
  }, [id]);

  console.log(recommendation);

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
          {recommendation.map((rec, index) => {
            return (
              <Link
                to={`/${id}/service/${rec.service._id}/${rec.service.name}`}
                key={index}
              >
                <div className="recommend-container">
                  <img src={rec.service.imageLogo} alt="" />
                  <div className="service-info">
                    <h1>{rec.service.name}</h1>
                    <p>{rec.service.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Recommendation;
