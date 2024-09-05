import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecommendation();
  }, [id]);
  return (
    <div>
      <h1>Recommendation</h1>
      {recommendation.map((rec) => {
        return <li key={rec.service._id}>{rec.service.name}</li>;
      })}
    </div>
  );
};

export default Recommendation;
