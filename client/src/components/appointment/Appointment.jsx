import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Appointment = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    midInitial: "",
    age: "",
    gender: "",
    clinicId: id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
