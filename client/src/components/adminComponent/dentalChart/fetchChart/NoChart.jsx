import React, { useState } from "react";
import "./fetchChart.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { teeth_data } from "../../../../TeethData";
import { toast } from "react-toastify";

const NoChart = ({ fetchChartInfo }) => {
  const [teeth] = useState(teeth_data);
  const { id } = useParams();

  const createDentalChart = async (e) => {
    e.preventDefault();
    const patientId = id;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/chart/create",
        {
          patientId,
          teeth,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success(
          `Dental chart created for patient: ${patient.patientName}`
        );
        await fetchChartInfo(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="no-chart-container">
      <div className="no-chart-content">
        <h1>OOPS</h1>
        <span className="error-404">Error 404 - Page Not Found.</span>
        <h4>
          Click the button below to create a dental chart for this patient.
        </h4>
        <button onClick={createDentalChart}>Create Chart</button>

        <Link to="/clinic">
          <h5>Go to clinic</h5>
        </Link>
      </div>
    </div>
  );
};

export default NoChart;
