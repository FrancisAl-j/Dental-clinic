import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Close from "../../assets/close.svg";
import "./popup.css";
import {
  addPatientStart,
  addPatientSuccess,
} from "../../redux/clinic/patientListReducer.js";
import axios from "axios";

const AddPatient = ({ setPopUp }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    patientEmail: "",
    patientGender: "Male",
    patientContact: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      patientName,
      patientAge,
      patientEmail,
      patientGender,
      patientContact,
    } = formData;
    try {
      dispatch(addPatientStart());
      const res = await axios.post(
        "http://localhost:5000/list/create-patient",
        {
          patientName,
          patientAge,
          patientEmail,
          patientGender,
          patientContact,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch(addPatientSuccess(res.data));
      }
    } catch (error) {
      setError("There was a problem creating a patient");
    }

    setFormData({
      patientName: "",
      patientAge: "",
      patientEmail: "",
      patientGender: "Male",
      patientContact: "",
    });
  };

  return (
    <div className="popup">
      <div className="popup-container">
        <div className="logo-header">
          <h1>Add a patient</h1>
          <img onClick={() => setPopUp(false)} src={Close} alt="Close" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="popup-element">
            <input
              type="text"
              placeholder="Patient Name"
              name="patientName"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Patient Age"
              name="patientAge"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="patientEmail"
              onChange={handleChange}
            />
            <select name="patientGender" onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Contact Number"
              name="patientContact"
              onChange={handleChange}
            />
          </div>

          <button>Create</button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
