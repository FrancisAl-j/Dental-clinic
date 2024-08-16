import { useState } from "react";
import { useSelector } from "react-redux";

const UpdateClinic = () => {
  const { currentClinic } = useSelector((state) => state.clinic);
  const [formData, setFormData] = useState({
    clinicName: currentClinic.clinicName,
    location: currentClinic.location,
    email: currentClinic.email,
    phone: currentClinic.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <h1>Update clinic</h1>

      <div className="form-wrapper">
        <form>
          <div className="form-element">
            <span>Clinic Name</span>
            <input
              type="text"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <span>Address</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <span>Contact Number</span>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateClinic;
