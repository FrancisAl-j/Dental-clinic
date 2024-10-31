import React, { useEffect, useState } from "react";
import "./fetchChart.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ToothStatus from "../toothImages/ToothStatus";
import UpdateTooth from "../UpdateTooth/UpdateTooth";

const FetchChart = () => {
  const [chart, setChart] = useState([]);
  const [toothId, setToothId] = useState(null);

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
      <div>
        {chart &&
          chart.map((data, index) => {
            return (
              <div key={index} className="top-jaw">
                {data.teeth &&
                  data.teeth.map((tooth, index) => {
                    if (tooth.toothNumber <= 16) {
                      return (
                        <div key={index}>
                          <div onClick={() => setToothId(tooth._id)}>
                            <p>{tooth.toothNumber}</p>
                            <ToothStatus
                              status={tooth.status}
                              toothNumber={tooth.toothNumber}
                            />
                          </div>
                          {toothId === tooth._id && (
                            <UpdateTooth
                              setToothId={setToothId}
                              id={data._id}
                              toothId={tooth._id}
                              status={tooth.status}
                              toothNumber={tooth.toothNumber}
                              fetchChartInfo={fetchChartInfo}
                              patientId={id}
                            />
                          )}
                        </div>
                      );
                    }
                  })}
              </div>
            );
          })}
      </div>

      <div className="bottom-jaw">
        {chart &&
          chart.map((data, index) => {
            return (
              <div key={index}>
                {data.teeth &&
                  data.teeth.map((tooth, index) => {
                    if (tooth.toothNumber > 16) {
                      return (
                        <div key={index}>
                          <p>{tooth.toothNumber}</p>
                          <ToothStatus
                            status={tooth.status}
                            toothNumber={tooth.toothNumber}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FetchChart;
