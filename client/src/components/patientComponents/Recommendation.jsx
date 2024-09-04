import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Recommendation = () => {
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const res = await axios.get("");
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <div>
      <h1>Recommendation</h1>
    </div>
  );
};

export default Recommendation;
