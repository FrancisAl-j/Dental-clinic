import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Appointment = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    midInitial: "",
    patientAge: "",
    patientGender: "",
    clinicId: id,
    appointmentDate: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        fName,
        lName,
        midInitial,
        patientAge,
        patientGender,
        clinicId,
        appointmentDate,
      } = formData;

      const patientName = `${lName}, ${fName} ${midInitial}.`;

      const res = await axios.post("http://localhost:5000/clinic/appointment", {
        patientName,
        patientAge,
        patientGender,
        clinicId,
        appointmentDate,
      });
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="flex-container">
      <div className="left-container"></div>

      <div className="right-container">
        <form className="appointment-form">
          <h2 className="form-title">Book an Appointment</h2>

          <div className="form-input-container">
            <div className="form-elements">
              <input
                type="text"
                name="fName"
                placeholder="Fist name"
                value={formData.fName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="lName"
                placeholder="Last name"
                value={formData.lName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="midInitial"
                placeholder="Middle Initial"
                value={formData.midInitial}
                onChange={handleChange}
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.patientAge}
                onChange={handleChange}
              />

              <select
                name="patientGender"
                value={formData.patientGender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <button>Book Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
