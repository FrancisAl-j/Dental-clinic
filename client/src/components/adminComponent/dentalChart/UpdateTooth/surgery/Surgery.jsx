import React from "react";
import "./surgery.css";
import axios from "axios";

const Surgery = ({ id, surgery, fetchChartInfo, patientId, toothId }) => {
  const handleUpdateTooth = async (e) => {
    const { name, value } = e.target;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/chart/update/${id}/${toothId}`,
        {
          [name]: value,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        await fetchChartInfo(patientId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="surgery-container">
      <h3>Surgery</h3>
      <select
        name="surgery"
        id=""
        value={surgery}
        onChange={(e) => handleUpdateTooth(e)}
      >
        <option disabled value="None">
          Fill Surgery
        </option>
        <option value="Extraction due to Caries">
          Extraction due to Caries
        </option>
        <option value="Extraction due to other causes">
          Extraction due to other causes
        </option>
        <option value="Congenitally Missing">Congenitally Missing</option>
        <option value="Supernumerary">Supernumerary</option>
      </select>
    </div>
  );
};

export default Surgery;
