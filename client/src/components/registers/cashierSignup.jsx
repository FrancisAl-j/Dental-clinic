import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/clinic.css";
import { specialized_data } from "../specialize";
import { toast } from "react-toastify";
import { time_data } from "../DaysData";

const CashierSignup = () => {
  const [formData, setFormData] = useState({
    fName: "",
    mInitial: "",
    lName: "",
    email: "",
    password: "",
    Cpassword: "",
    specialize: "None",
    type: "Dentist",
  });
  const [available, setAvailable] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [availableTime, setAvailableTime] = useState([]);

  //console.log(available);

  const handleTime = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setAvailableTime((prev) => [...prev, value]);
    } else {
      setAvailableTime((prev) => prev.filter((time) => time !== value));
    }
  };

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
      specialize,
      type,
    } = formData;
    const name = `${fName} ${mInitial}. ${lName}`;
    if (password !== password) {
      setError("Password do not match!");
      return;
    }
    // ! Ended here What I need to fix tommorow is tha payment verification
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/cashier/signup",
        {
          name,
          email,
          password,
          Cpassword,
          available,
          specialize,
          type,
          availableTime,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 400) {
        setError("Not authenticated!");
      } else {
        toast.success("Dentist Created");
        setFormData({
          fName: "",
          mInitial: "",
          lName: "",
          email: "",
          password: "",
          Cpassword: "",
          specialize: "None",
        });
        setAvailable([]);
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="form-container">
      <h1>Create account for Dentist</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <span>Specialties</span>
            <select
              name="specialize"
              id=""
              value={formData.specialize}
              onChange={handleChange}
              required
            >
              <option disabled value="None">
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
              required
            />
          </div>

          <div className="form-element">
            <span>Last name</span>
            <input
              type="text"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-element">
            <span>Middle Initial</span>
            <input
              type="text"
              name="mInitial"
              value={formData.mInitial}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-element">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              required
            />
          </div>

          <div className="form-element">
            <span>Confirm Password</span>
            <input
              type="password"
              name="Cpassword"
              value={formData.Cpassword}
              onChange={handleChange}
              required
            />
          </div>

          <button>Create Dentist</button>
        </form>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
      <Link to="/create-assistant">
        <button className="next-btn">Create Assistant</button>
      </Link>
    </div>
  );
};

export default CashierSignup;
