import { useState } from "react";
import { setClinic, failClinic } from "../redux/clinic/clinicReducer.js";
import axios from "axios";
import { useDispatch } from "react-redux";

const CreateClinic = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    clinicName: "",
    location: "",
    email: "",
    phone: "",
  });

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
      const res = await axios.post(
        "http://localhost:5000/clinic/create",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      const data = res.data;
      if (res.status === 200) {
        dispatch(setClinic(res.data));
      } else {
        dispatch(failClinic({ message: "Something went wrong!" }));
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data); // Log error data
        dispatch(
          failClinic({
            message:
              error.response.data.message || "An unexpected error occurred.",
            code: error.response.status,
          })
        );
      } else {
        console.error("Network Error:", error);
        dispatch(failClinic({ message: "Network error. Please try again." }));
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Create Clinic</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <span>Clinic name</span>
            <input
              type="text"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-element">
            <span>Location</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-element">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-element">
            <span>Phone Number</span>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            ></input>
          </div>

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateClinic;
