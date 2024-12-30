import React from "react";
import "./crown.css";
import axios from "axios";

const Crown = ({ id, toothId, crown, fetchChartInfo, patientId }) => {
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
    <div className="crown-container">
      <h3>Crown</h3>
      <select
        name="crown"
        id=""
        value={crown}
        onChange={(e) => handleUpdateTooth(e)}
      >
        <option disabled value="None">
          Fill Tooth
        </option>
        <option value="Ceramic Crown">Ceramic Crown</option>
        <option value="Metallic Crown">Metallic Crown</option>
        <option value="Porcelain Fused Metal Crown">
          Porcelain Fused Metal Crown
        </option>
        <option value="Gold Crown">Gold Crown</option>
      </select>
    </div>
  );
};

export default Crown;
