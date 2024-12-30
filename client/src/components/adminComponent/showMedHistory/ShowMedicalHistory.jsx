import React, { useEffect, useState } from "react";
import "./showMed.css";
import axios from "axios";

const ShowMedicalHistory = ({ id, name, setPatientID, gender }) => {
  const [medical, setMedical] = useState([]);

  useEffect(() => {
    fetchMedical();
  }, []);

  const fetchMedical = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/medical/get/medical/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setMedical(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(medical);

  return (
    <section className="show-med-container">
      <div className="show-med-wrapper">
        <header>
          <h1>Medical History</h1>
          <h3 onClick={() => setPatientID(null)}>X</h3>
        </header>

        {medical && medical.length !== 0 ? (
          medical.map((data, index) => {
            return (
              <section className="show-med-content" key={index}>
                <h3>Name: {name}</h3>
                {data.questions &&
                  data.questions.map((question, index) => {
                    return (
                      <div key={index}>
                        <div className="question-element">
                          <span>1. Are you in good health? </span>
                          <span>
                            <b>{question.healthy ? "Yes" : "No"}</b>
                          </span>
                        </div>

                        <div className="question-element">
                          <span>2. Are you under medical treatment? </span>
                          <span>
                            <b>{question.treatment ? "Yes" : "No"}</b>
                          </span>
                          {question.treatment && (
                            <h4>Specify: {question.yesTreatment}</h4>
                          )}
                        </div>

                        <div className="question-element">
                          <span>
                            3. Have you ever had serious illnes or surgical
                            operation?{" "}
                          </span>
                          <span>
                            <b>{question.illness ? "Yes" : "No"}</b>
                          </span>
                          {question.illness && (
                            <h4>Specify: {question.yesIllness}</h4>
                          )}
                        </div>

                        <div className="question-element">
                          <span>4. Have you ever been hospitalized? </span>
                          <span>
                            <b>{question.hospitalized ? "Yes" : "No"}</b>
                          </span>
                          {question.hospitalized && (
                            <h4>Specify: {question.yesHospitalized}</h4>
                          )}
                        </div>

                        <div className="question-element">
                          <span>
                            5. Are you taking any prescription/non-prescription
                            medication?{" "}
                          </span>
                          <span>
                            <b>{question.hospitalized ? "Yes" : "No"}</b>
                          </span>
                          {question.hospitalized && (
                            <h4>Specify: {question.yesHospitalized}</h4>
                          )}
                        </div>

                        <div className="question-element">
                          <span>6. Do you use tobacco products? </span>
                          <span>
                            <b>{question.smoking ? "Yes" : "No"}</b>
                          </span>
                        </div>

                        <div className="question-element">
                          <span>
                            7. Do you use alcohol, cocaine or other dangerous
                            drugs?{" "}
                          </span>
                          <span>
                            <b>{question.addiction ? "Yes" : "No"}</b>
                          </span>
                        </div>

                        <div className="question-element">
                          <span>
                            8. Are you allergic to any of this following:
                          </span>
                          {question.allergic &&
                            question.allergic.map((allergy, index) => {
                              return <h5 key={index}>* {allergy}</h5>;
                            })}
                        </div>

                        <div className="question-element">
                          <span>9. Bleeding Time: </span>
                          <span>
                            <b>{question.bleedingTime}</b>
                          </span>
                        </div>

                        {gender && gender === "Female" && (
                          <>
                            <div className="question-element">
                              <span>10. Are you Pregnant? </span>
                              <span>
                                <b>{question.pregnant}</b>
                              </span>
                            </div>

                            <div className="question-element">
                              <span>10. Are you nursing? </span>
                              <span>
                                <b>{question.nursing}</b>
                              </span>
                            </div>

                            <div className="question-element">
                              <span>
                                10. Are you taking birth control pills?{" "}
                              </span>
                              <span>
                                <b>{question.pills}</b>
                              </span>
                            </div>
                          </>
                        )}

                        <div className="question-element">
                          <span>11. Blood Type: </span>
                          <span>
                            <b>{question.bloodType}</b>
                          </span>
                        </div>

                        <div className="question-element">
                          <span>Blood Pressure: </span>
                          <span>
                            <b>{question.bloodPressure}</b>
                          </span>
                        </div>

                        <div className="question-element">
                          <span>
                            13. Do you have or have you had any of the
                            following? Check which applies.
                          </span>
                          {question.diseases &&
                            question.diseases.map((data, index) => {
                              return <h5 key={index}>- {data}</h5>;
                            })}
                        </div>
                      </div>
                    );
                  })}
              </section>
            );
          })
        ) : (
          <section className="show-med-content">
            <h3>There is no medical history available for {name}</h3>
          </section>
        )}
      </div>
    </section>
  );
};

export default ShowMedicalHistory;
