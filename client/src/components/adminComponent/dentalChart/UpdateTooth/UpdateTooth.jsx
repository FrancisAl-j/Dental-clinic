import React from "react";
import "./updateTooth.css";
import axios from "axios";

const UpdateTooth = ({
  setToothId,
  id,
  toothId,
  status,
  toothNumber,
  fetchChartInfo,
  patientId,
}) => {
  const handleUpdateTooth = async (e) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/chart/update/${id}/${toothId}`,
        {
          status: e.target.value,
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
    <form className="tooth-form">
      <header>
        <h1>Tooth # {toothNumber}</h1>
        <p onClick={() => setToothId(null)}>X</p>
      </header>
      <section className="form-content">
        <select value={status} onChange={(e) => handleUpdateTooth(e)}>
          <option value="Healthy">Healthy</option>
          <option value="Decayed">Decayed</option>
        </select>
      </section>
    </form>
  );
};

export default UpdateTooth;
