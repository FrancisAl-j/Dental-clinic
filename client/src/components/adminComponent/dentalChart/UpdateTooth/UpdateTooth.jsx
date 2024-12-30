import React, { useState } from "react";
import "./updateTooth.css";
import axios from "axios";
import ToothParts from "./toothParts/toothParts";
import Crown from "./crown/Crown";
import Surgery from "./surgery/Surgery";
import InlayOnlay from "./inlayOnlay/InlayOnlay";

const UpdateTooth = ({
  setToothId,
  id,
  toothId,
  status,
  prosthetic,
  surgery,
  toothNumber,
  fetchChartInfo,
  patientId,
  occlusal,
  mesial,
  distal,
  buccal,
  lingual,
  bridge,
  crown,
}) => {
  const [toothStatus, setToothStatus] = useState(undefined);
  /*


     <section className="form-content">
          <h1>Status</h1>
          <select
            value={status}
            name="status"
            onChange={(e) => handleUpdateTooth(e)}
          >
            <option value="Healthy">Healthy</option>
            <option value="Decayed">Decayed</option>
          </select>
        </section>

        <section className="form-content">
          <h1>Prosthetic</h1>
          <select
            value={prosthetic}
            name="prosthetic"
            onChange={(e) => handleUpdateTooth(e)}
          >
            <option disabled>None</option>
            <option value="Jacket Crown">Jacket Crown</option>
            <option value="Pontic">Pontic</option>
          </select>
        </section>

        <section className="form-content">
          <h1>Surgery</h1>
          <select
            value={surgery}
            name="surgery"
            onChange={(e) => handleUpdateTooth(e)}
          >
            <option disabled value="None">
              None
            </option>
            <option value="Surgery">Surgery</option>
            <option value="Surgery1">Surgery1</option>
          </select>
        </section>

        Porcelain Fused to Metal Crown = #F5DCB1
Ceramic Crown = #F5DCB1
Gold Crown = #FFCD0B
Metal Crown = #D0D0D2
Ceramic Inlay/Onlay = #F5DCB1
Gold Inlay/Onlay = # FFCD0B
Metal Inlay/Onlay = #D0D0D2
  };*/

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

  const clearTooth = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/chart/clear/${id}/${toothId}`,
        {},
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
    <div className="update-container">
      <form className="tooth-form">
        <header>
          <div className="sub-header">
            <h1>Tooth # {toothNumber}</h1>
            {bridge === true && <h4 className="float-bridge">Bridge</h4>}
          </div>

          <p onClick={() => setToothId(null)}>X</p>
        </header>
        <section className="tooth-status">
          <div className="radio-holder">
            <input
              type="radio"
              id="present"
              name="status"
              value="Present"
              checked={status === "Present"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="present">Present</label>
          </div>

          <div className="radio-holder">
            <input
              type="radio"
              id="missing"
              name="status"
              value="Missing"
              checked={status === "Missing"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="missing">Missing</label>
          </div>

          <div className="radio-holder">
            <input
              type="radio"
              id="implant"
              name="status"
              value="Implant"
              checked={status === "Implant"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="implant">Implant</label>
          </div>

          <div className="radio-holder">
            <input
              type="radio"
              id="rootFragment"
              name="status"
              value="Root Fragment"
              checked={status === "Root Fragment"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="rootFragment">Root Fragment</label>
          </div>

          <div className="radio-holder">
            <input
              type="radio"
              id="impacted"
              name="status"
              value="Impacted Tooth"
              checked={status === "Impacted Tooth"}
              onChange={(e) => handleUpdateTooth(e)}
            />
            <label htmlFor="impacted">Impacted Tooth</label>
          </div>
        </section>
        <ToothParts
          occlusal={occlusal}
          mesial={mesial}
          distal={distal}
          buccal={buccal}
          lingual={lingual}
          id={id}
          toothId={toothId}
          fetchChartInfo={fetchChartInfo}
          patientId={patientId}
        />

        <Crown
          id={id}
          toothId={toothId}
          crown={crown}
          fetchChartInfo={fetchChartInfo}
          patientId={patientId}
        />

        <Surgery
          id={id}
          fetchChartInfo={fetchChartInfo}
          patientId={patientId}
          toothId={toothId}
          surgery={surgery}
        />

        <InlayOnlay
          occlusal={occlusal}
          mesial={mesial}
          distal={distal}
          buccal={buccal}
          lingual={lingual}
          id={id}
          toothId={toothId}
          fetchChartInfo={fetchChartInfo}
          patientId={patientId}
        />

        <div className="buttons">
          <button type="button" onClick={clearTooth}>
            Clear Chart
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTooth;
