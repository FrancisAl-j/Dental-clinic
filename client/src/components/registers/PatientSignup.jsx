import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../css/login.css";

const PatientSignup = ({ token, setToken }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    Cpassword: "",
    gender: "None",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, Cpassword, gender } = formData;
    if (password !== Cpassword) {
      setError("Password do not match!");
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/patient/signup",
        {
          username,
          email,
          password,
          Cpassword,
          gender,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setMessage("Account created successfully");
        toast.success("Email activation sent!");
        setToken(res.data.token);
        console.log(token);

        localStorage.getItem("token", res.data.token);
      }
    } catch (error) {
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
  };

  return (
    <div className="form-body">
      <div className="form-container">
        <h1>Create an account</h1>

        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-element">
              <span>Name</span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-element">
              <span>Gender</span>
              <select
                name="gender"
                id=""
                value={formData.gender}
                onChange={handleChange}
              >
                <option disabled value="None">
                  Choose a gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
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
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-element">
              <span>Confirm Password</span>
              <input
                type="password"
                name="Cpassword"
                value={formData.Cpassword}
                onChange={handleChange}
              />
            </div>
            <button>Create</button>
          </form>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
        </div>
        <Link to="/adminSignup">
          <button className="next-btn">Register as Admin</button>
        </Link>
      </div>
    </div>
  );
};

export default PatientSignup;
