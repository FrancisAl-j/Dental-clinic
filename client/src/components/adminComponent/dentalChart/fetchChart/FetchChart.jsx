import React, { useEffect, useRef, useState } from "react";
import "./fetchChart.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ToothStatus from "../toothImages/ToothStatus";
import UpdateTooth from "../UpdateTooth/UpdateTooth";
import ToothImage from "../toothImages/ToothImage";
import { data_images } from "../toothImages/dataImage";
import Legend from "../legend/Legend";
import CreateChart from "../createChart/CreateChart";
import Note from "../note/Note";
import NoChart from "./NoChart";

const FetchChart = () => {
  const [chart, setChart] = useState([]);
  const [toothId, setToothId] = useState(null);
  const [bridgeId, setBridgeId] = useState(null);
  const [note, setNote] = useState(false);

  const checkBoxRef = useRef({});

  //console.log(chart);

  const { id } = useParams();
  //console.log(chart);

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

  /* 
 
  */

  const handleUpdateTooth = async (e, teethId, toothId) => {
    const { name, checked } = e.target;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/chart/update/${teethId}/${toothId}`,
        {
          [name]: checked,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        await fetchChartInfo(id);
        setBridgeId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toothNumberClick = (toothId) => {
    setBridgeId((prev) => (prev === toothId ? null : toothId));
  };

  // ! Updating chart
  const updateChart = async (e, teethId) => {
    const { name, value } = e.target;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/chart/update/chart/${teethId}`,
        {
          [name]: value,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        await fetchChartInfo(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dental-chart-container">
      {chart && chart.length === 0 ? (
        <NoChart fetchChartInfo={fetchChartInfo} />
      ) : (
        chart.map((data, index) => {
          return (
            <div key={index} className="patient-info">
              <h3>Patient Name: {data.patientId.patientName}</h3>
              <h3>Age: {data.patientId.patientAge}</h3>
              <h3>Gender: {data.patientId.patientGender}</h3>
              <button onClick={() => setNote(true)} className="note">
                Note
              </button>
              {note && (
                <Note
                  setNote={setNote}
                  id={data._id}
                  name={data.patientId.patientName}
                  dataNotes={data.notes}
                />
              )}
            </div>
          );
        })
      )}
      <div className="tooth-content-container">
        {chart.length === 0 ? <></> : <Legend />}
        <div className="tooth-content">
          <div className="child-teeth">
            {chart &&
              chart.map((data, index) => {
                const toothID = data.teeth.find(
                  (tooth) => tooth._id === bridgeId
                );
                return (
                  <div key={index} className="upper-jaw">
                    {data.teeth &&
                      data.teeth.map((tooth, index) => {
                        if (tooth.toothNumber > 32 && tooth.toothNumber <= 42) {
                          return (
                            <div key={index} className="tooth-flex">
                              <label
                                className={tooth.bridge ? "unbridge" : "bridge"}
                                htmlFor={tooth._id}
                                onClick={() => toothNumberClick(tooth._id)}
                              >
                                {tooth.toothNumber}
                              </label>

                              <input
                                type="checkbox"
                                id={tooth._id}
                                name="bridge"
                                value={false}
                                checked={tooth.bridge || false}
                                onChange={(e) =>
                                  handleUpdateTooth(
                                    e,
                                    data._id,
                                    bridgeId ? bridgeId : tooth._id
                                  )
                                }
                                ref={checkBoxRef}
                                hidden
                              />
                              <div
                                onClick={() => setToothId(tooth._id)}
                                className="tooth"
                              >
                                {tooth.status === "Present" ? (
                                  <img
                                    src={data_images.Check}
                                    className="img-status"
                                  />
                                ) : tooth.status === "Missing" ? (
                                  <span>M</span>
                                ) : tooth.status === "Root Fragment" ? (
                                  <span>RF</span>
                                ) : tooth.status === "Impacted Tooth" ? (
                                  <span>IM</span>
                                ) : tooth.status === "Implant" ? (
                                  <img
                                    src={data_images.Implant}
                                    className="img-status"
                                  />
                                ) : (
                                  <img
                                    src={data_images.Check}
                                    className="img-status"
                                  />
                                )}
                                <ToothImage
                                  occlusal={tooth.occlusal}
                                  mesial={tooth.mesial}
                                  distal={tooth.distal}
                                  buccal={tooth.buccal}
                                  lingual={tooth.lingual}
                                  crown={tooth.crown}
                                />
                              </div>
                              {toothId === tooth._id && (
                                <UpdateTooth
                                  setToothId={setToothId}
                                  id={data._id}
                                  toothId={tooth._id}
                                  status={tooth.status}
                                  prosthetic={tooth.prosthetic}
                                  surgery={tooth.surgery}
                                  toothNumber={tooth.toothNumber}
                                  occlusal={tooth.occlusal}
                                  mesial={tooth.mesial}
                                  distal={tooth.distal}
                                  buccal={tooth.buccal}
                                  lingual={tooth.lingual}
                                  fetchChartInfo={fetchChartInfo}
                                  patientId={id}
                                  bridge={tooth.bridge}
                                  crown={tooth.crown}
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
          <div className="adult-teeth">
            <div>
              {chart && // Tooth 1-16
                chart.map((data, index) => {
                  return (
                    <div key={index} className="top-jaw">
                      {data.teeth &&
                        data.teeth.map((tooth, index) => {
                          if (tooth.toothNumber <= 16) {
                            return (
                              <div key={index} className="tooth-flex">
                                <label
                                  className={
                                    tooth.bridge ? "unbridge" : "bridge"
                                  }
                                  htmlFor={tooth._id}
                                  onClick={() => toothNumberClick(tooth._id)}
                                >
                                  {tooth.toothNumber}
                                </label>

                                <input
                                  type="checkbox"
                                  id={tooth._id}
                                  name="bridge"
                                  value={false}
                                  checked={tooth.bridge || false}
                                  onChange={(e) =>
                                    handleUpdateTooth(
                                      e,
                                      data._id,
                                      bridgeId ? bridgeId : tooth._id
                                    )
                                  }
                                  ref={checkBoxRef}
                                  hidden
                                />
                                <div
                                  onClick={() => setToothId(tooth._id)}
                                  className="tooth"
                                >
                                  {tooth.status === "Present" ? (
                                    <img
                                      src={data_images.Check}
                                      className="img-status"
                                    />
                                  ) : tooth.status === "Missing" ? (
                                    <span>M</span>
                                  ) : tooth.status === "Root Fragment" ? (
                                    <span>RF</span>
                                  ) : tooth.status === "Impacted Tooth" ? (
                                    <span>IM</span>
                                  ) : tooth.status === "Implant" ? (
                                    <img
                                      src={data_images.Implant}
                                      className="img-status"
                                    />
                                  ) : (
                                    <img
                                      src={data_images.Check}
                                      className="img-status"
                                    />
                                  )}
                                  <ToothImage
                                    occlusal={tooth.occlusal}
                                    mesial={tooth.mesial}
                                    distal={tooth.distal}
                                    buccal={tooth.buccal}
                                    lingual={tooth.lingual}
                                    crown={tooth.crown}
                                  />
                                </div>
                                {toothId === tooth._id && (
                                  <UpdateTooth
                                    setToothId={setToothId}
                                    id={data._id}
                                    toothId={tooth._id}
                                    status={tooth.status}
                                    prosthetic={tooth.prosthetic}
                                    surgery={tooth.surgery}
                                    toothNumber={tooth.toothNumber}
                                    occlusal={tooth.occlusal}
                                    mesial={tooth.mesial}
                                    distal={tooth.distal}
                                    buccal={tooth.buccal}
                                    lingual={tooth.lingual}
                                    fetchChartInfo={fetchChartInfo}
                                    patientId={id}
                                    bridge={tooth.bridge}
                                    crown={tooth.crown}
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

            <div>
              {chart && // Tooth 17-32
                chart.map((data, index) => {
                  return (
                    <div key={index} className="bottom-jaw">
                      {data.teeth &&
                        data.teeth.map((tooth, index) => {
                          if (
                            tooth.toothNumber > 16 &&
                            tooth.toothNumber <= 32
                          ) {
                            return (
                              <div key={index} className="tooth-flex">
                                <label
                                  className={
                                    tooth.bridge ? "unbridge" : "bridge"
                                  }
                                  htmlFor={tooth._id}
                                  onClick={() => toothNumberClick(tooth._id)}
                                >
                                  {tooth.toothNumber}
                                </label>

                                <input
                                  type="checkbox"
                                  id={tooth._id}
                                  name="bridge"
                                  value={false}
                                  checked={tooth.bridge || false}
                                  onChange={(e) =>
                                    handleUpdateTooth(
                                      e,
                                      data._id,
                                      bridgeId ? bridgeId : tooth._id
                                    )
                                  }
                                  ref={checkBoxRef}
                                  hidden
                                />
                                <div
                                  onClick={() => setToothId(tooth._id)}
                                  className="tooth"
                                >
                                  {tooth.status === "Present" ? (
                                    <img
                                      src={data_images.Check}
                                      className="img-status"
                                    />
                                  ) : tooth.status === "Missing" ? (
                                    <span>M</span>
                                  ) : tooth.status === "Root Fragment" ? (
                                    <span>RF</span>
                                  ) : tooth.status === "Impacted Tooth" ? (
                                    <span>IM</span>
                                  ) : tooth.status === "Implant" ? (
                                    <img
                                      src={data_images.Implant}
                                      className="img-status"
                                    />
                                  ) : (
                                    <img
                                      src={data_images.Check}
                                      className="img-status"
                                    />
                                  )}

                                  <ToothImage
                                    occlusal={tooth.occlusal}
                                    mesial={tooth.mesial}
                                    distal={tooth.distal}
                                    buccal={tooth.buccal}
                                    lingual={tooth.lingual}
                                    crown={tooth.crown}
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
                                    occlusal={tooth.occlusal}
                                    mesial={tooth.mesial}
                                    distal={tooth.distal}
                                    buccal={tooth.buccal}
                                    lingual={tooth.lingual}
                                    bridge={tooth.bridge}
                                    crown={tooth.crown}
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
          </div>

          <div className="child-teeth">
            {chart &&
              chart.map((data, index) => {
                return (
                  <div key={index} className="bot-jaw">
                    {data.teeth &&
                      data.teeth.map((tooth, index) => {
                        if (tooth.toothNumber > 42 && tooth.toothNumber <= 52) {
                          return (
                            <div key={index} className="tooth-flex">
                              <label
                                className={tooth.bridge ? "unbridge" : "bridge"}
                                htmlFor={tooth._id}
                                onClick={() => toothNumberClick(tooth._id)}
                              >
                                {tooth.toothNumber}
                              </label>

                              <input
                                type="checkbox"
                                id={tooth._id}
                                name="bridge"
                                value={false}
                                checked={tooth.bridge || false}
                                onChange={(e) =>
                                  handleUpdateTooth(
                                    e,
                                    data._id,
                                    bridgeId ? bridgeId : tooth._id
                                  )
                                }
                                ref={checkBoxRef}
                                hidden
                              />
                              <div
                                onClick={() => setToothId(tooth._id)}
                                className="tooth"
                              >
                                {tooth.status === "Present" ? (
                                  <img
                                    src={data_images.Check}
                                    className="img-status"
                                  />
                                ) : tooth.status === "Missing" ? (
                                  <span>M</span>
                                ) : tooth.status === "Root Fragment" ? (
                                  <span>RF</span>
                                ) : tooth.status === "Impacted Tooth" ? (
                                  <span>IM</span>
                                ) : tooth.status === "Implant" ? (
                                  <img
                                    src={data_images.Implant}
                                    className="img-status"
                                  />
                                ) : (
                                  <img
                                    src={data_images.Check}
                                    className="img-status"
                                  />
                                )}

                                <ToothImage
                                  occlusal={tooth.occlusal}
                                  mesial={tooth.mesial}
                                  distal={tooth.distal}
                                  buccal={tooth.buccal}
                                  lingual={tooth.lingual}
                                  crown={tooth.crown}
                                />
                              </div>
                              {toothId === tooth._id && (
                                <UpdateTooth
                                  setToothId={setToothId}
                                  id={data._id}
                                  toothId={tooth._id}
                                  status={tooth.status}
                                  prosthetic={tooth.prosthetic}
                                  surgery={tooth.surgery}
                                  toothNumber={tooth.toothNumber}
                                  occlusal={tooth.occlusal}
                                  mesial={tooth.mesial}
                                  distal={tooth.distal}
                                  buccal={tooth.buccal}
                                  lingual={tooth.lingual}
                                  fetchChartInfo={fetchChartInfo}
                                  patientId={id}
                                  bridge={tooth.bridge}
                                  crown={tooth.crown}
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
        </div>
      </div>

      {chart &&
        chart.map((data, index) => {
          return (
            <div className="other-data" key={index}>
              <div className="ps-container">
                <h3>Periodical Screening</h3>
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="Gingivitis"
                    name="ps"
                    value="Gingivitis"
                    checked={data.ps === "Gingivitis" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="Gingivitis">Gingivitis</label>
                </div>

                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="Early Periodontics"
                    name="ps"
                    value="Early Periodontics"
                    checked={data.ps === "Early Periodontics" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="Early Periodontics">Early Periodontics</label>
                </div>

                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="Moderate Periodontics"
                    name="ps"
                    value="Moderate Periodontics"
                    checked={data.ps === "Moderate Periodontics" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="Moderate Periodontics">
                    Moderate Periodontics
                  </label>
                </div>

                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="Advanced Periodontics"
                    name="ps"
                    value="Advanced Periodontics"
                    checked={data.ps === "Advanced Periodontics" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="Advanced Periodontics">
                    Advanced Periodontics
                  </label>
                </div>
              </div>
              <div className="occlusion-container">
                <h3>Occlusion:</h3>
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="1"
                    name="occlusion"
                    value="Class (Molar)"
                    checked={data.occlusion === "Class (Molar)" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="1">Class (Molar)</label>
                </div>

                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="2"
                    name="occlusion"
                    value="Overjet"
                    checked={data.occlusion === "Overjet" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="2">Overjet</label>
                </div>

                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="3"
                    name="occlusion"
                    value="Overbite"
                    checked={data.occlusion === "Overbite" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="3">Overbite</label>
                </div>

                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="4"
                    name="occlusion"
                    value="Midline Deviation"
                    checked={data.occlusion === "Midline Deviation" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="4">Midline Deviation</label>
                </div>

                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="5"
                    name="occlusion"
                    value="Crossbite"
                    checked={data.occlusion === "Crossbite" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="5">Crossbite</label>
                </div>
              </div>

              <div className="tmd-container">
                <h3>TMD:</h3>
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="Clenching"
                    name="tmd"
                    value="Clenching"
                    checked={data.tmd === "Clenching" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="Clenching">Clenching</label>
                </div>

                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="Clicking"
                    name="tmd"
                    value="Clicking"
                    checked={data.tmd === "Clicking" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="Clicking">Clicking</label>
                </div>

                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="Trimus"
                    name="tmd"
                    value="Trimus"
                    checked={data.tmd === "Trimus" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="Trimus">Trimus</label>
                </div>

                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="Muscle Spasm"
                    name="tmd"
                    value="Muscle Spasm"
                    checked={data.tmd === "Muscle Spasm" || false}
                    onChange={(e) => updateChart(e, data._id)}
                  />
                  <label htmlFor="Muscle Spasm">Muscle Spasm</label>
                </div>
              </div>

              {/* this is the last */}
            </div>
          );
        })}
    </div>
  );
};

export default FetchChart;
