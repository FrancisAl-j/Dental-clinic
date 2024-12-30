import React, { useState } from "react";
import "./inlayOnlay.css";
import axios from "axios";

const InlayOnlay = ({
  occlusal,
  mesial,
  distal,
  buccal,
  lingual,
  id,
  toothId,
  patientId,
  fetchChartInfo,
}) => {
  const [inlay, setInlay] = useState("None");

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
    <div className="inlay-container">
      <div>
        <h3>Inlay/Onlay</h3>
        <select
          name=""
          id=""
          value={inlay}
          onChange={(e) => setInlay(e.target.value)}
        >
          <option disabled value="None">
            Fiil Tooth
          </option>
          <option value="Ceramic Inlay/Onlay">Ceramic Inlay/Onlay</option>
          <option value="Gold Inlay/Onlay">Gold Inlay/Onlay</option>
          <option value="Metal Inlay/Onlay">Metal Inlay/Onlay</option>
        </select>
      </div>

      <section>
        <div className="caries">
          <div className="check-container">
            <input
              type="checkbox"
              id="occlusalIO"
              name="occlusal"
              value={occlusal === "None" ? inlay : occlusal}
              checked={
                occlusal === "Gold Inlay/Onlay" ||
                occlusal === "Ceramic Inlay/Onlay" ||
                occlusal === "Metal Inlay/Onlay"
              }
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="occlusalIO">Occlusal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="mesialIO"
              name="mesial"
              value={mesial === "None" ? inlay : mesial}
              checked={
                mesial === "Gold Inlay/Onlay" ||
                mesial === "Ceramic Inlay/Onlay" ||
                mesial === "Metal Inlay/Onlay"
              }
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="mesialIO">Mesial</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="distalIO"
              name="distal"
              value={distal === "None" ? inlay : distal}
              checked={
                distal === "Gold Inlay/Onlay" ||
                distal === "Ceramic Inlay/Onlay" ||
                distal === "Metal Inlay/Onlay"
              }
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="distalIO">Distal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="buccalIO"
              name="buccal"
              value={buccal === "None" ? inlay : buccal}
              checked={
                buccal === "Gold Inlay/Onlay" ||
                buccal === "Ceramic Inlay/Onlay" ||
                buccal === "Metal Inlay/Onlay"
              }
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="buccalIO">Buccal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="lingualIO"
              name="lingual"
              value={lingual === "None" ? inlay : lingual}
              checked={
                lingual === "Gold Inlay/Onlay" ||
                lingual === "Ceramic Inlay/Onlay" ||
                lingual === "Metal Inlay/Onlay"
              }
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="lingualIO">Lingual</label>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InlayOnlay;
