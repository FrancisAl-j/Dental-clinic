import React, { useState } from "react";
import axios from "axios";
import "./toothPart.css";

const ToothParts = ({
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
  const [dataOcclusal, setDataOcclusal] = useState(undefined);
  const [dataMesial, setDataMesial] = useState(undefined);
  const [dataDistal, setDataDistal] = useState(undefined);
  const [dataBuccal, setDataBuccal] = useState(undefined);
  const [dataLingual, setDataLingual] = useState(undefined);

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
    <div className="part-wrapper">
      <div className="part-container">
        <h3>Caries</h3>
        <div className="caries">
          <div className="check-container">
            <input
              type="checkbox"
              id="occlusal"
              value={occlusal === "None" ? "Caries" : occlusal}
              name="occlusal"
              checked={occlusal === "Caries"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="occlusal">Occlusal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="mesial"
              value={mesial === "None" ? "Caries" : mesial}
              name="mesial"
              checked={mesial === "Caries"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="mesial">Mesial</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="distal"
              value={distal === "None" ? "Caries" : distal}
              name="distal"
              checked={distal === "Caries"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="distal">Distal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="buccal"
              value={buccal === "None" ? "Caries" : buccal}
              name="buccal"
              checked={buccal === "Caries"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="buccal">Buccal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="lingual"
              value={lingual === "None" ? "Caries" : lingual}
              name="lingual"
              checked={lingual === "Caries"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="lingual">Lingual</label>
          </div>
        </div>
      </div>

      <div className="part-container">
        <h3>Composite</h3>
        <div className="composite">
          <div className="check-container">
            <input
              type="checkbox"
              id="occlusal1"
              value={occlusal === "None" ? "Composite" : occlusal}
              name="occlusal"
              checked={occlusal === "Composite"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="occlusal1">Occlusal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="mesial1"
              value={mesial === "None" ? "Composite" : mesial}
              name="mesial"
              checked={mesial === "Composite"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="mesial1">Mesial</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="distal1"
              value={distal === "None" ? "Composite" : distal}
              name="distal"
              checked={distal === "Composite"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="distal1">Distal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="buccal1"
              value={buccal === "None" ? "Composite" : buccal}
              name="buccal"
              checked={buccal === "Composite"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="buccal1">Buccal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="lingual1"
              value={lingual === "None" ? "Composite" : lingual}
              name="lingual"
              checked={lingual === "Composite"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="lingual1">Lingual</label>
          </div>
        </div>
      </div>

      <div className="part-container">
        <h3>Amalgam</h3>
        <div className="amalgam">
          <div className="check-container">
            <input
              type="checkbox"
              id="occlusal2"
              value={occlusal === "None" ? "Amalgam" : occlusal}
              name="occlusal"
              checked={occlusal === "Amalgam"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="occlusal2">Occlusal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="mesial2"
              value={mesial === "None" ? "Amalgam" : mesial}
              name="mesial"
              checked={mesial === "Amalgam"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="mesial2">Mesial</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="distal2"
              value={distal === "None" ? "Amalgam" : distal}
              name="distal"
              checked={distal === "Amalgam"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="distal2">Distal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="buccal2"
              value={buccal === "None" ? "Amalgam" : buccal}
              name="buccal"
              checked={buccal === "Amalgam"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="buccal2">Buccal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="lingual2"
              value={lingual === "None" ? "Amalgam" : lingual}
              name="lingual"
              checked={lingual === "Amalgam"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="lingual2">Lingual</label>
          </div>
        </div>
      </div>

      <div className="part-container">
        <h3>Recurrent Caries</h3>
        <div className="amalgam">
          <div className="check-container">
            <input
              type="checkbox"
              id="occlusal3"
              value={occlusal === "None" ? "Recurrent Caries" : occlusal}
              name="occlusal"
              checked={occlusal === "Recurrent Caries"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="occlusal3">Occlusal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="mesial3"
              value={mesial === "None" ? "Recurrent Caries" : mesial}
              name="mesial"
              checked={mesial === "Recurrent Caries"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="mesial3">Mesial</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="distal3"
              value={distal === "None" ? "Recurrent Caries" : distal}
              name="distal"
              checked={distal === "Recurrent Caries"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="distal3">Distal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="buccal3"
              value={buccal === "None" ? "Recurrent Caries" : buccal}
              name="buccal"
              checked={buccal === "Recurrent Caries"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="buccal3">Buccal</label>
          </div>

          <div className="check-container">
            <input
              type="checkbox"
              id="lingual3"
              value={lingual === "None" ? "Recurrent Caries" : lingual}
              name="lingual"
              checked={lingual === "Recurrent Caries"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="lingual3">Lingual</label>
          </div>
        </div>
      </div>
      {/* this is the end div */}
    </div>
  );
};

export default ToothParts;
