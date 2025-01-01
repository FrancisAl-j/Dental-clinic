import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/login.css";
import "../css/clinic.css";
import { specialized_data } from "../specialize";
import { time_data } from "../DaysData";

const AdminSignUp = () => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState([]);
  const [availableTime, setAvailableTime] = useState([]);
  const [formData, setFormData] = useState({
    fName: "",
    mInitial: "",
    lName: "",
    email: "",
    password: "",
    Cpassword: "",
    specialize: "",
    type: "Owner",
  });
  const [error, setError] = useState(null);

  const handleCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the selected day to the available array
      setAvailable((prev) => [...prev, parseInt(value)]);
    } else {
      // Remove the deselected day from the available array
      setAvailable((prev) => prev.filter((day) => day !== parseInt(value)));
    }
  };

  const handleTime = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setAvailableTime((prev) => [...prev, value]);
    } else {
      setAvailableTime((prev) => prev.filter((time) => time !== value));
    }
  };

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
      fName,
      lName,
      mInitial,
      email,
      password,
      Cpassword,
      type,
      specialize,
    } = formData;

    const fullname = `${fName} ${mInitial}. ${lName}`;

    try {
      const res = await axios.post("http://localhost:5000/auth/admin/signup", {
        fullname,
        email,
        password,
        Cpassword,
        available,
        type,
        specialize,
        availableTime,
      });

      if (res.status === 200) {
        toast.success("Activation of account sent");
        setError(null);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  /* 
    if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          setError("User not found, please check your Email or password");
        } else if (status === 400) {
          setError("Password is required");
        } else {
          setError("An unexpected error occur, please try again");
        }
      } else {
        setError("Network error please check your connection");
      }
    }
  */

  return (
    <div className="form-container">
      <h1>Admin Sign up</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <span>Specialties</span>
            <select
              name="specialize"
              id=""
              value={formData.specialize}
              onChange={handleChange}
            >
              <option disabled value="">
                Fill Specialties
              </option>
              {specialized_data &&
                specialized_data.map((data, index) => {
                  return (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-element">
            <span>First name</span>
            <input
              type="text"
              name="fName"
              value={formData.fName}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <span>Last name</span>
            <input
              type="text"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <span>Middle Initial</span>
            <input
              type="text"
              name="mInitial"
              value={formData.mInitial}
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
            <span>Days Available</span>
            <div className="days-container">
              {[
                { day: "Monday", value: 1 },
                { day: "Tuesday", value: 2 },
                { day: "Wednesday", value: 3 },
                { day: "Thursday", value: 4 },
                { day: "Friday", value: 5 },
                { day: "Saturday", value: 6 },
                { day: "Sunday", value: 0 },
              ].map((data, index) => (
                <div className="day-element" key={index}>
                  <input
                    type="checkbox"
                    id={data.day.toLowerCase()}
                    value={data.value} // Use day as the value
                    onChange={handleCheck}
                  />
                  <label htmlFor={data.day.toLowerCase()}>{data.day}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-element">
            <span>Time Available: </span>
            <div className="days-container">
              {time_data.map((time, index) => {
                return (
                  <div className="day-element" key={index}>
                    <input
                      type="checkbox"
                      id={time}
                      value={time}
                      onChange={handleTime}
                    />
                    <label htmlFor={time}>{time}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-element">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <span>Confirm password</span>
            <input
              type="password"
              name="Cpassword"
              value={formData.Cpassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
      <Link to="/patient-signup">
        <button className="next-btn">Sign up as Patient</button>
      </Link>
    </div>
  );
};

export default AdminSignUp;
