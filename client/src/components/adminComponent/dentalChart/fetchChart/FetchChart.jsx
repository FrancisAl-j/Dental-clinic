import React, { useEffect, useState } from "react";
import "./fetchChart.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const FetchChart = () => {
  const [chart, setChart] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchChartInfo(id);
    }
  }, [id]);

  const fetchChartInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chart/get/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setChart(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dental-chart-container">
      {chart &&
        chart.map((data, index) => {
          return (
            <div key={index}>
              {data.teeth &&
                data.teeth.map((tooth, index) => {
                  return (
                    <div key={index}>
                      <p>{tooth.toothNumber}</p>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default FetchChart;
