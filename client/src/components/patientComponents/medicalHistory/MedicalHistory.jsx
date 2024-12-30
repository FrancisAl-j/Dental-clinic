import React, { useEffect, useState } from "react";
import "./medicalHistory.css";
import { useSelector } from "react-redux";
import axios from "axios";

const MedicalHistory = ({ setMedical, medicalData, fetchMedicalHistory }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [diseases, setDiseases] = useState([]);
  const [allergic, setAllergic] = useState([]);
  const [formData, setFormData] = useState({
    healthy: "",
    treatment: "",
    illness: "",
    hospitalized: "",
    medication: "",
    smoking: "",
    addiction: "",
    bloodType: "O+",

    // For womens only
    pregnant: "",
    nursing: "",
    pills: "",
  });

  const [yesData, setYesData] = useState({
    yesTreatment: "",
    yesIllness: "",
    yesHospitalized: "",
    yesMedication: "",
    bleedingTime: "",

    bloodPressure: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setYesData({
      ...yesData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (Array.isArray(medicalData) && medicalData.length > 0) {
      const firstMedicalEntry = medicalData[0]; // Get the first medical entry
      if (firstMedicalEntry?.questions?.length > 0) {
        const questionData = firstMedicalEntry.questions[0]; // Assuming you want the first question
        setYesData({
          yesTreatment: questionData.yesTreatment || "",
          yesIllness: questionData.yesIllness || "",
          yesHospitalized: questionData.yesHospitalized || "",
          yesMedication: questionData.yesMedication || "",
          bleedingTime: questionData.bleedingTime || "",
          bloodPressure: questionData.bloodPressure || "",
        });
      }
    }
  }, [medicalData]);

  const handleCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the selected day to the available array
      setAllergic((prev) => [...prev, value]);
    } else {
      // Remove the deselected day from the available array
      setAllergic((prev) => prev.filter((data) => data !== value));
    }
  };

  const handleDiseases = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setDiseases((prev) => [...prev, value]);
    } else {
      setDiseases((prev) => prev.filter((data) => data !== value));
    }
  };

  //console.log(diseases);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      healthy,
      treatment,
      illness,
      hospitalized,
      medication,
      smoking,
      addiction,
      pregnant,
      nursing,
      pills,
    } = formData;

    const {
      yesTreatment,
      yesIllness,
      yesHospitalized,
      yesMedication,
      bleedingTime,
      bloodType,
      bloodPressure,
    } = yesData;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/medical/create",
        {
          healthy,
          treatment,
          illness,
          hospitalized,
          medication,
          smoking,
          addiction,
          pregnant,
          nursing,
          pills,
          yesTreatment,
          yesIllness,
          yesHospitalized,
          yesMedication,
          bleedingTime,
          bloodType,
          bloodPressure,
          diseases,
          allergic,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setMedical(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetching Medical History for update

  //console.log(medicalData);

  /* useEffect(() => {
    if (medicalData) {
      console.log(medicalData);
      const questions = medicalData.map((data) => data.questions);
      //const question = medicalData.questions[0];
      const question = questions.map((data) => ({
        yesTreatment: data.yesTreatment || "",
        yesIllness: data.yesIllness || "",
        yesHospitalized: data.yesHospitalized || "",
        yesMedication: data.yesMedication || "",
        bleedingTime: data.bleedingTime || "",
        bloodType: data.bloodType || "O+",
        bloodPressure: data.bloodPressure || "",
      }));

      setYesData(question);
    }
  }, [medicalData]);

  console.log("Bleeding Time" + yesData.bleedingTime);*/

  // Update Medical History
  const updateMedicalHistory = async (e, id, questionsId) => {
    e.preventDefault();
    const { name, value } = e.target;
    const {
      yesMedication,
      yesHospitalized,
      yesIllness,
      yesTreatment,
      bleedingTime,
      bloodType,
      bloodPressure,
    } = yesData;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/medical/update/${id}/${questionsId}`,
        {
          [name]: value === "true",
          yesMedication,
          yesHospitalized,
          yesIllness,
          yesTreatment,
          bleedingTime,
          bloodType,
          bloodPressure,
          diseases,
          allergic,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        await fetchMedicalHistory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Diseases

  useEffect(() => {
    if (currentUser.medicalHistory === true) {
      fetchDiseases();
    }
  }, [currentUser]);

  const fetchDiseases = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/medical/get/diseases",
        { withCredentials: true }
      );

      if (res.status === 200) {
        setDiseases(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Allergic
  useEffect(() => {
    if (currentUser.medicalHistory === true) {
      fetchAllergic();
    }
  }, [currentUser]);

  const fetchAllergic = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/medical/get/allergic",
        { withCredentials: true }
      );

      if (res.status === 200) {
        setAllergic(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="medical-container">
      {currentUser && currentUser.medicalHistory ? (
        <>
          {medicalData &&
            medicalData.map((data, index) => {
              return (
                <form key={index}>
                  <header>
                    <h1>Update Medical History</h1>
                    <h3 onClick={() => setMedical(false)}>X</h3>
                  </header>

                  {data.questions &&
                    data.questions.map((question, index) => {
                      // This shows if the user already had answered the medical history form

                      return (
                        <section className="questions" key={index}>
                          <div className="question-element">
                            <span>1. Are you in good health?</span>
                            <div className="radio-elements">
                              <div className="radio">
                                <input
                                  type="radio"
                                  id="yes"
                                  name="healthy"
                                  value="true"
                                  checked={question.healthy === true}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="yes">Yes</label>
                              </div>

                              <div className="radio">
                                <input
                                  type="radio"
                                  id="no"
                                  name="healthy"
                                  value="false"
                                  checked={question.healthy === false}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="no">No</label>
                              </div>
                            </div>
                          </div>
                          <div className="question-element">
                            <span>2. Are you under medical treatment ?</span>
                            <div className="radio-elements">
                              <div className="radio">
                                <input
                                  type="radio"
                                  id="yes1"
                                  name="treatment"
                                  value="true"
                                  checked={question.treatment === true}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="yes1">Yes</label>
                              </div>

                              <div className="radio">
                                <input
                                  type="radio"
                                  id="no1"
                                  name="treatment"
                                  value="false"
                                  checked={question.treatment === false}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="no1">No</label>
                              </div>
                            </div>
                          </div>
                          {question.treatment === true && (
                            <div className="question-element">
                              <span>
                                If so, what is the condition being treated?
                              </span>
                              <input
                                type="text"
                                placeholder="E.g, Tuberculosis"
                                name="yesTreatment"
                                value={
                                  question.yesTreatment || yesData.yesTreatment
                                }
                                onChange={handleChange}
                              />
                            </div>
                          )}
                          <div className="question-element">
                            <span>
                              3. Have you ever had serious illnes or surgical
                              operation?
                            </span>
                            <div className="radio-elements">
                              <div className="radio">
                                <input
                                  type="radio"
                                  id="yes2"
                                  name="illness"
                                  value="true"
                                  checked={question.illness === true}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="yes2">Yes</label>
                              </div>

                              <div className="radio">
                                <input
                                  type="radio"
                                  id="no2"
                                  name="illness"
                                  value="false"
                                  checked={question.illness === false}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="no2">No</label>
                              </div>
                            </div>
                          </div>
                          {question.illness === true && (
                            <div className="question-element">
                              <span>If so, what illness or operation?</span>
                              <input
                                type="text"
                                placeholder="E.g, Illness"
                                name="yesIllness"
                                value={
                                  question.yesIllness || yesData.yesIllness
                                }
                                onChange={handleChange}
                              />
                            </div>
                          )}
                          <div className="question-element">
                            <span>4. Have you ever been hospitalized?</span>
                            <div className="radio-elements">
                              <div className="radio">
                                <input
                                  type="radio"
                                  id="yes3"
                                  name="hospitalized"
                                  value="true"
                                  checked={question.hospitalized === true}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="yes3">Yes</label>
                              </div>

                              <div className="radio">
                                <input
                                  type="radio"
                                  id="no3"
                                  name="hospitalized"
                                  value="false"
                                  checked={question.hospitalized === false}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="no3">No</label>
                              </div>
                            </div>
                          </div>
                          {question.hospitalized === true && (
                            <div className="question-element">
                              <span>If so, please specify</span>
                              <input
                                type="text"
                                placeholder="E.g, Reasons"
                                name="yesHospitalized"
                                value={
                                  question.yesHospitalized ||
                                  yesData.yesHospitalized
                                }
                                onChange={handleChange}
                              />
                            </div>
                          )}
                          <div className="question-element">
                            <span>
                              5. Are you taking any
                              prescription/non-prescription medication?
                            </span>
                            <div className="radio-elements">
                              <div className="radio">
                                <input
                                  type="radio"
                                  id="yes4"
                                  name="medication"
                                  value="true"
                                  checked={question.medication === true}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="yes4">Yes</label>
                              </div>

                              <div className="radio">
                                <input
                                  type="radio"
                                  id="no4"
                                  name="medication"
                                  value="false"
                                  checked={question.medication === false}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="no4">No</label>
                              </div>
                            </div>
                          </div>
                          {question.medication === true && (
                            <div className="question-element">
                              <span>If so, please specify</span>
                              <input
                                type="text"
                                placeholder="E.g, Medication"
                                name="yesMedication"
                                value={
                                  question.yesMedication ||
                                  yesData.yesMedication
                                }
                                onChange={handleChange}
                              />
                            </div>
                          )}
                          <div className="question-element">
                            <span>6. Do you use tobacco products?</span>
                            <div className="radio-elements">
                              <div className="radio">
                                <input
                                  type="radio"
                                  id="yes5"
                                  name="smoking"
                                  value="true"
                                  checked={question.smoking === true}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="yes5">Yes</label>
                              </div>

                              <div className="radio">
                                <input
                                  type="radio"
                                  id="no5"
                                  name="smoking"
                                  value="false"
                                  checked={question.smoking === false}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="no5">No</label>
                              </div>
                            </div>
                          </div>
                          <div className="question-element">
                            <span>
                              7. Do you use alcohol, cocaine or other dangerous
                              drigs?
                            </span>
                            <div className="radio-elements">
                              <div className="radio">
                                <input
                                  type="radio"
                                  id="yes6"
                                  name="addiction"
                                  value="true"
                                  checked={question.addiction === true}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="yes6">Yes</label>
                              </div>

                              <div className="radio">
                                <input
                                  type="radio"
                                  id="no6"
                                  name="addiction"
                                  value="false"
                                  checked={question.addiction === false}
                                  onChange={(e) =>
                                    updateMedicalHistory(
                                      e,
                                      data._id,
                                      question._id
                                    )
                                  }
                                />
                                <label htmlFor="no6">No</label>
                              </div>
                            </div>
                          </div>
                          <div className="questions-element">
                            <span>
                              8. Are you allergic to any of this following:{" "}
                            </span>
                            <div className="array-container">
                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="localAnesthetic"
                                  value="Local Anesthetic"
                                  checked={
                                    allergic.includes("Local Anesthetic") ||
                                    false
                                  }
                                  onChange={handleCheck}
                                />
                                <label htmlFor="localAnesthetic">
                                  Local Anesthetic
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="sulfurDrugs"
                                  value="Sulfur Drugs"
                                  checked={
                                    allergic.includes("Sulfur Drugs") || false
                                  }
                                  onChange={handleCheck}
                                />
                                <label htmlFor="sulfurDrugs">
                                  Sulfur Drugs
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="aspirin"
                                  value="Aspirin"
                                  checked={
                                    allergic.includes("Aspirin") || false
                                  }
                                  onChange={handleCheck}
                                />
                                <label htmlFor="aspirin">Aspirin</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="latex"
                                  value="Latex"
                                  checked={allergic.includes("Latex") || false}
                                  onChange={handleCheck}
                                />
                                <label htmlFor="latex">Latex</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="penicilin"
                                  value="Penicillin, Antibiotics"
                                  checked={
                                    allergic.includes(
                                      "Penicillin, Antibiotics"
                                    ) || false
                                  }
                                  onChange={handleCheck}
                                />
                                <label htmlFor="penicilin">
                                  Penicillin, Antibiotics
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="question-element">
                            <span>9. Bleeding Time</span>
                            <input
                              type="number"
                              name="bleedingTime"
                              value={
                                question.bleedingTime || yesData.bleedingTime
                              }
                              onChange={handleChange}
                            />
                          </div>
                          {currentUser && currentUser.gender === "Female" && (
                            <>
                              <div className="question-element">
                                <span>9. Are you pregnant?</span>
                                <div className="radio-elements">
                                  <div className="radio">
                                    <input
                                      type="radio"
                                      id="yes7"
                                      name="pregnant"
                                      value="true"
                                      checked={question.pregnant === true}
                                      onChange={(e) =>
                                        updateMedicalHistory(
                                          e,
                                          data._id,
                                          question._id
                                        )
                                      }
                                    />
                                    <label htmlFor="yes7">Yes</label>
                                  </div>

                                  <div className="radio">
                                    <input
                                      type="radio"
                                      id="no7"
                                      name="pregnant"
                                      value="false"
                                      checked={question.pregnant === false}
                                      onChange={(e) =>
                                        updateMedicalHistory(
                                          e,
                                          data._id,
                                          question._id
                                        )
                                      }
                                    />
                                    <label htmlFor="no7">No</label>
                                  </div>
                                </div>
                              </div>

                              <div className="question-element">
                                <span>10. Are you nursing?</span>
                                <div className="radio-elements">
                                  <div className="radio">
                                    <input
                                      type="radio"
                                      id="yes8"
                                      name="nursing"
                                      value="true"
                                      checked={question.nursing === true}
                                      onChange={(e) =>
                                        updateMedicalHistory(
                                          e,
                                          data._id,
                                          question._id
                                        )
                                      }
                                    />
                                    <label htmlFor="yes8">Yes</label>
                                  </div>

                                  <div className="radio">
                                    <input
                                      type="radio"
                                      id="no8"
                                      name="nursing"
                                      value="false"
                                      checked={question.nursing === false}
                                      onChange={(e) =>
                                        updateMedicalHistory(
                                          e,
                                          data._id,
                                          question._id
                                        )
                                      }
                                    />
                                    <label htmlFor="no8">No</label>
                                  </div>
                                </div>
                              </div>

                              <div className="question-element">
                                <span>
                                  10. Are you taking birth control pills?
                                </span>
                                <div className="radio-elements">
                                  <div className="radio">
                                    <input
                                      type="radio"
                                      id="yesss"
                                      name="pills"
                                      value="true"
                                      checked={question.pills === true}
                                      onChange={(e) =>
                                        updateMedicalHistory(
                                          e,
                                          data._id,
                                          question._id
                                        )
                                      }
                                    />
                                    <label htmlFor="yesss">Yes</label>
                                  </div>

                                  <div className="radio">
                                    <input
                                      type="radio"
                                      id="nooo"
                                      name="pills"
                                      value="false"
                                      checked={question.pills === false}
                                      onChange={(e) =>
                                        updateMedicalHistory(
                                          e,
                                          data._id,
                                          question._id
                                        )
                                      }
                                    />
                                    <label htmlFor="nooo">No</label>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          <div className="question-element">
                            <span>11. Blood Type</span>
                            <select
                              name="bloodType"
                              value={question.bloodType}
                              onChange={(e) => updateMedicalHistory(e)}
                            >
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                            </select>
                          </div>
                          <div className="question-element">
                            <span>12. Blood Pressure</span>
                            <input
                              type="number"
                              name="bloodPressure"
                              value={
                                question.bloodPressure || yesData.bloodPressure
                              }
                              onChange={handleChange}
                            />
                          </div>
                          <div className="questions-element">
                            <span>
                              13. Do you have or have you had any of the
                              following? Check which applies.
                            </span>
                            <div className="array-container" key={index}>
                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="highBlood"
                                  value="High Blood Pressure"
                                  name="diseases"
                                  checked={
                                    diseases.includes("High Blood Pressure") ||
                                    false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="highBlood">
                                  High Blood Pressure
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="lowBlood"
                                  value="Low Blood Pressure"
                                  checked={
                                    diseases.includes("Low Blood Pressure") ||
                                    false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="lowBlood">
                                  Low Blood Pressure
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="epilepsy"
                                  value="Epilepsy/Convulsion"
                                  checked={
                                    diseases.includes("Epilepsy/Convulsion") ||
                                    false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="epilepsy">
                                  Epilepsy / Convulsion
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="aids"
                                  value="AIDS or HIV infection"
                                  checked={
                                    diseases.includes(
                                      "AIDS or HIV infection"
                                    ) || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="adis">
                                  AIDS or HIV infection
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="std"
                                  value="Sexually Transmitted Diseases"
                                  checked={
                                    diseases.includes(
                                      "Sexually Transmitted Diseases"
                                    ) || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="std">
                                  Sexually Transmitted Diseases
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="ulcer"
                                  value="Stomach Troubles / Ulcer"
                                  checked={
                                    diseases.includes(
                                      "Stomach Troubles / Ulcer"
                                    ) || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="ulcer">
                                  Stomach Troubles / Ulcer
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="seizure"
                                  value="Fainting Seizure"
                                  checked={
                                    diseases.includes("Fainting Seizure") ||
                                    false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="seizure">
                                  Fainting Seizure
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="loss"
                                  value="Rapid Weight Loss"
                                  checked={
                                    diseases.includes("Rapid Weight Loss") ||
                                    false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="loss">Rapid Weight Loss</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="radiation"
                                  value="Radiation Therapy"
                                  checked={
                                    diseases.includes("Radiation Therapy") ||
                                    false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="radiation">
                                  Radiation Therapy
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="implant"
                                  value="Joint Replacament / Implant"
                                  checked={
                                    diseases.includes(
                                      "Joint Replacament / Implant"
                                    ) || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="implant">
                                  Joint Replacament / Implant
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="heart"
                                  value="Heart Surgery"
                                  checked={
                                    diseases.includes("Heart Surgery") || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="heart">Heart Surgery</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="disease"
                                  value="Heart Disease"
                                  checked={
                                    diseases.includes("Heart Disease") || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="disease">Heart Disease</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="mur"
                                  value="Heart Murmur"
                                  checked={
                                    diseases.includes("Heart Murmur") || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="mur">Heart Murmur</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="liver"
                                  value="Hepatitis / Liver Disease"
                                  checked={
                                    diseases.includes(
                                      "Hepatitis / Liver Disease"
                                    ) || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="liver">
                                  Hepatitis / Liver Disease
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="fever"
                                  value="Rheumatic Fever"
                                  checked={
                                    diseases.includes("Rheumatic Fever") ||
                                    false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="fever">Rheumatic Fever</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="hay"
                                  value="Hay Fever / Allergies"
                                  checked={
                                    diseases.includes(
                                      "Hay Fever / Allergies"
                                    ) || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="hay">
                                  Hay Fever / Allergies
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="lungs"
                                  value="Respiratory Problem"
                                  checked={
                                    diseases.includes("Respiratory Problem") ||
                                    false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="lungs">
                                  Respiratory Problem
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="jaundice"
                                  value="Hepatitis / Jaundice"
                                  checked={
                                    diseases.includes("Hepatitis / Jaundice") ||
                                    false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="jaundice">
                                  Hepatitis / Jaundice
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="tb"
                                  value="Tuberculosis"
                                  checked={
                                    diseases.includes("Tuberculosis") || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="tb">Tuberculosis</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="ankles"
                                  value="Swollen Ankles"
                                  checked={
                                    diseases.includes("Swollen Ankles") || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="ankles">Swollen Ankles</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="kidney"
                                  value="Kidney Disease"
                                  checked={
                                    diseases.includes("Kidney Disease") || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="kidney">Kidney Disease</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="diabetes"
                                  value="Diabeter"
                                  checked={
                                    diseases.includes("Diabeter") || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="diabetes">Diabetes</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="arthritis"
                                  value="Arthritis / Rheumatism"
                                  checked={
                                    diseases.includes(
                                      "Arthritis / Rheumatism"
                                    ) || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="arthritis">
                                  Arthritis / Rheumatism
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="cancer"
                                  value="Cancer / Tumors"
                                  checked={
                                    diseases.includes("Cancer / Tumors") ||
                                    false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="cancer">Cancer / Tumors</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="anemia"
                                  value="Anemia"
                                  checked={diseases.includes("Anemia") || false}
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="anemia">Anemia</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="angina"
                                  value="Angina"
                                  checked={diseases.includes("Angina") || false}
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="angina">Angina</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="asthma"
                                  value="Asthma"
                                  checked={diseases.includes("Asthma") || false}
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="asthma">Asthma</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="em"
                                  value="Emphysema"
                                  checked={
                                    diseases.includes("Emphysema") || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="em">Emphysema</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="bleeding"
                                  value="Bleeding Problems"
                                  checked={
                                    diseases.includes("Bleeding Problems") ||
                                    false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="bleeding">
                                  Bleeding Problems
                                </label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="db"
                                  value="Blood Diseases"
                                  checked={
                                    diseases.includes("Blood Diseases") || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="db">Blood Diseases</label>
                              </div>

                              <div className="checkboxes">
                                <input
                                  type="checkbox"
                                  id="head"
                                  value="Head Injuries"
                                  checked={
                                    diseases.includes("Head Injuries") || false
                                  }
                                  onChange={handleDiseases}
                                />
                                <label htmlFor="head">Head Injuries</label>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={(e) =>
                              updateMedicalHistory(e, data._id, question._id)
                            }
                          >
                            Update
                          </button>
                          ;{/* Closing for section */}
                        </section>
                      );
                    })}
                </form>
              );
            })}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <header>
            <h1>Medical History</h1>
            <h3 onClick={() => setMedical(false)}>X</h3>
          </header>

          <section className="questions">
            <div className="question-element">
              <span>1. Are you in good health?</span>
              <div className="radio-elements">
                <div className="radio">
                  <input
                    type="radio"
                    id="yes"
                    name="healthy"
                    value={true}
                    checked={formData.healthy === true}
                    onChange={handleChange}
                  />
                  <label htmlFor="yes">Yes</label>
                </div>

                <div className="radio">
                  <input
                    type="radio"
                    id="no"
                    name="healthy"
                    value={false}
                    checked={formData.healthy === false}
                    onChange={handleChange}
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>

            <div className="question-element">
              <span>2. Are you under medical treatment ?</span>
              <div className="radio-elements">
                <div className="radio">
                  <input
                    type="radio"
                    id="yes1"
                    name="treatment"
                    value={true}
                    checked={formData.treatment === true}
                    onChange={handleChange}
                  />
                  <label htmlFor="yes1">Yes</label>
                </div>

                <div className="radio">
                  <input
                    type="radio"
                    id="no1"
                    name="treatment"
                    value={false}
                    checked={formData.treatment === false}
                    onChange={handleChange}
                  />
                  <label htmlFor="no1">No</label>
                </div>
              </div>
            </div>

            {formData.treatment === true && (
              <div className="question-element">
                <span>If so, what is the condition being treated?</span>
                <input
                  type="text"
                  placeholder="E.g, Tuberculosis"
                  name="yesTreatment"
                  value={yesData.yesTreatment}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="question-element">
              <span>
                3. Have you ever had serious illnes or surgical operation?
              </span>
              <div className="radio-elements">
                <div className="radio">
                  <input
                    type="radio"
                    id="yes2"
                    name="illness"
                    value={true}
                    checked={formData.illness === true}
                    onChange={handleChange}
                  />
                  <label htmlFor="yes2">Yes</label>
                </div>

                <div className="radio">
                  <input
                    type="radio"
                    id="no2"
                    name="illness"
                    value={false}
                    checked={formData.illness === false}
                    onChange={handleChange}
                  />
                  <label htmlFor="no2">No</label>
                </div>
              </div>
            </div>

            {formData.illness === true && (
              <div className="question-element">
                <span>If so, what illness or operation?</span>
                <input
                  type="text"
                  placeholder="E.g, Illness"
                  name="yesIllness"
                  value={yesData.yesIllness}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="question-element">
              <span>4. Have you ever been hospitalized?</span>
              <div className="radio-elements">
                <div className="radio">
                  <input
                    type="radio"
                    id="yes3"
                    name="hospitalized"
                    value={true}
                    checked={formData.hospitalized === true}
                    onChange={handleChange}
                  />
                  <label htmlFor="yes3">Yes</label>
                </div>

                <div className="radio">
                  <input
                    type="radio"
                    id="no3"
                    name="hospitalized"
                    value={false}
                    checked={formData.hospitalized === false}
                    onChange={handleChange}
                  />
                  <label htmlFor="no3">No</label>
                </div>
              </div>
            </div>

            {formData.hospitalized === true && (
              <div className="question-element">
                <span>If so, please specify</span>
                <input
                  type="text"
                  placeholder="E.g, Reasons"
                  name="yesHospitalized"
                  value={yesData.yesHospitalized}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="question-element">
              <span>
                5. Are you taking any prescription/non-prescription medication?
              </span>
              <div className="radio-elements">
                <div className="radio">
                  <input
                    type="radio"
                    id="yes4"
                    name="medication"
                    value={true}
                    checked={formData.medication === true}
                    onChange={handleChange}
                  />
                  <label htmlFor="yes4">Yes</label>
                </div>

                <div className="radio">
                  <input
                    type="radio"
                    id="no4"
                    name="medication"
                    value={false}
                    checked={formData.medication === false}
                    onChange={handleChange}
                  />
                  <label htmlFor="no4">No</label>
                </div>
              </div>
            </div>

            {formData.medication === true && (
              <div className="question-element">
                <span>If so, please specify</span>
                <input
                  type="text"
                  placeholder="E.g, Medication"
                  name="yesMedication"
                  value={yesData.yesMedication}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="question-element">
              <span>6. Do you use tobacco products?</span>
              <div className="radio-elements">
                <div className="radio">
                  <input
                    type="radio"
                    id="yes5"
                    name="smoking"
                    value={true}
                    checked={formData.smoking === true}
                    onChange={handleChange}
                  />
                  <label htmlFor="yes5">Yes</label>
                </div>

                <div className="radio">
                  <input
                    type="radio"
                    id="no5"
                    name="smoking"
                    value={false}
                    checked={formData.smoking === false}
                    onChange={handleChange}
                  />
                  <label htmlFor="no5">No</label>
                </div>
              </div>
            </div>

            <div className="question-element">
              <span>
                7. Do you use alcohol, cocaine or other dangerous drigs?
              </span>
              <div className="radio-elements">
                <div className="radio">
                  <input
                    type="radio"
                    id="yes6"
                    name="addiction"
                    value={true}
                    checked={formData.addiction === true}
                    onChange={handleChange}
                  />
                  <label htmlFor="yes6">Yes</label>
                </div>

                <div className="radio">
                  <input
                    type="radio"
                    id="no6"
                    name="addiction"
                    value={false}
                    checked={formData.addiction === false}
                    onChange={handleChange}
                  />
                  <label htmlFor="no6">No</label>
                </div>
              </div>
            </div>

            <div className="questions-element">
              <span>8. Are you allergic to any of this following: </span>
              <div className="array-container">
                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="localAnesthetic"
                    value="Local Anesthetic"
                    onChange={handleCheck}
                  />
                  <label htmlFor="localAnesthetic">Local Anesthetic</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="sulfurDrugs"
                    value="Sulfur Drugs"
                    onChange={handleCheck}
                  />
                  <label htmlFor="sulfurDrugs">Sulfur Drugs</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="aspirin"
                    value="Aspirin"
                    onChange={handleCheck}
                  />
                  <label htmlFor="aspirin">Aspirin</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="latex"
                    value="Latex"
                    onChange={handleCheck}
                  />
                  <label htmlFor="latex">Latex</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="penicilin"
                    value="Penicillin, Antibiotics"
                    onChange={handleCheck}
                  />
                  <label htmlFor="penicilin">Penicillin, Antibiotics</label>
                </div>
              </div>
            </div>

            <div className="question-element">
              <span>9. Bleeding Time</span>
              <input
                type="number"
                name="bleedingTime"
                value={yesData.bleedingTime}
                onChange={handleChange}
              />
            </div>
            {currentUser && currentUser.gender === "Female" && (
              <>
                <div className="question-element">
                  <span>9. Are you pregnant?</span>
                  <div className="radio-elements">
                    <div className="radio">
                      <input
                        type="radio"
                        id="yes7"
                        name="pregnant"
                        value={true}
                        checked={formData.pregnant === true}
                        onChange={handleChange}
                      />
                      <label htmlFor="yes7">Yes</label>
                    </div>

                    <div className="radio">
                      <input
                        type="radio"
                        id="no7"
                        name="pregnant"
                        value={false}
                        checked={formData.pregnant === false}
                        onChange={handleChange}
                      />
                      <label htmlFor="no7">No</label>
                    </div>
                  </div>
                </div>

                <div className="question-element">
                  <span>10. Are you nursing?</span>
                  <div className="radio-elements">
                    <div className="radio">
                      <input
                        type="radio"
                        id="yes8"
                        name="nursing"
                        value={true}
                        checked={formData.nursing === true}
                        onChange={handleChange}
                      />
                      <label htmlFor="yes8">Yes</label>
                    </div>

                    <div className="radio">
                      <input
                        type="radio"
                        id="no8"
                        name="nursing"
                        value={false}
                        checked={formData.nursing === false}
                        onChange={handleChange}
                      />
                      <label htmlFor="no8">No</label>
                    </div>
                  </div>
                </div>

                <div className="question-element">
                  <span>10. Are you taking birth control pills?</span>
                  <div className="radio-elements">
                    <div className="radio">
                      <input
                        type="radio"
                        id="yesss"
                        name="pills"
                        value={true}
                        checked={formData.pills === true}
                        onChange={handleChange}
                      />
                      <label htmlFor="yesss">Yes</label>
                    </div>

                    <div className="radio">
                      <input
                        type="radio"
                        id="nooo"
                        name="pills"
                        value={false}
                        checked={formData.pills === false}
                        onChange={handleChange}
                      />
                      <label htmlFor="nooo">No</label>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="question-element">
              <span>11. Blood Type</span>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="question-element">
              <span>12. Blood Pressure</span>
              <input
                type="number"
                name="bloodPressure"
                value={yesData.bloodPressure}
                onChange={handleChange}
              />
            </div>

            <div className="questions-element">
              <span>
                13. Do you have or have you had any of the following? Check
                which aoolies.
              </span>
              <div className="array-container">
                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="highBlood"
                    value="High Blood Pressure"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="highBlood">High Blood Pressure</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="lowBlood"
                    value="Low Blood Pressure"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="lowBlood">Low Blood Pressure</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="epilepsy"
                    value="Epilepsy/Convulsion"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="epilepsy">Epilepsy / Convulsion</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="aids"
                    value="AIDS or HIV infection"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="adis">AIDS or HIV infection</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="std"
                    value="Sexually Transmitted Diseases"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="std">Sexually Transmitted Diseases</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="ulcer"
                    value="Stomach Troubles / Ulcer"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="ulcer">Stomach Troubles / Ulcer</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="seizure"
                    value="Fainting Seizure"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="seizure">Fainting Seizure</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="loss"
                    value="Rapid Weight Loss"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="loss">Rapid Weight Loss</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="radiation"
                    value="Radiation Therapy"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="radiation">Radiation Therapy</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="implant"
                    value="Joint Replacament / Implant"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="implant">Joint Replacament / Implant</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="heart"
                    value="Heart Surgery"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="heart">Heart Surgery</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="disease"
                    value="Heart Disease"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="disease">Heart Disease</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="mur"
                    value="Heart Murmur"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="mur">Heart Murmur</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="liver"
                    value="Hepatitis / Liver Disease"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="liver">Hepatitis / Liver Disease</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="fever"
                    value="Rheumatic Fever"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="fever">Rheumatic Fever</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="hay"
                    value="Hay Fever / Allergies"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="hay">Hay Fever / Allergies</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="lungs"
                    value="Respiratory Problem"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="lungs">Respiratory Problem</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="jaundice"
                    value="Hepatitis / Jaundice"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="jaundice">Hepatitis / Jaundice</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="tb"
                    value="Tuberculosis"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="tb">Tuberculosis</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="ankles"
                    value="Swollen Ankles"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="ankles">Swollen Ankles</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="kidney"
                    value="Kidney Disease"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="kidney">Kidney Disease</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="diabetes"
                    value="Diabeter"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="diabetes">Diabetes</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="arthritis"
                    value="Arthritis / Rheumatism"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="arthritis">Arthritis / Rheumatism</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="cancer"
                    value="Cancer / Tumors"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="cancer">Cancer / Tumors</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="anemia"
                    value="Anemia"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="anemia">Anemia</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="angina"
                    value="Angina"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="angina">Angina</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="asthma"
                    value="Asthma"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="asthma">Asthma</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="em"
                    value="Emphysema"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="em">Emphysema</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="bleeding"
                    value="Bleeding Problems"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="bleeding">Bleeding Problems</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="db"
                    value="Blood Diseases"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="db">Blood Diseases</label>
                </div>

                <div className="checkboxes">
                  <input
                    type="checkbox"
                    id="head"
                    value="Head Injuries"
                    onChange={handleDiseases}
                  />
                  <label htmlFor="head">Head Injuries</label>
                </div>
              </div>
            </div>
          </section>

          {/* This is the closing for Forms */}
          <button>
            {currentUser && currentUser.medicalHistory ? "Update" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default MedicalHistory;
