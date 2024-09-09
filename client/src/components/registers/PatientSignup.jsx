import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PatientSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    Cpassword: "",
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
    const { username, email, password, Cpassword } = formData;
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
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setMessage("Account created successfully");
        toast.success("Account successfully created");
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
    <div className="form-container">
      <h1>Create an account</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <span>Username</span>
            <input
              type="text"
              name="username"
              value={formData.username}
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
        <Link to="/adminSignup">
          <span>Register as Admin</span>
        </Link>
      </div>
    </div>
  );
};

export default PatientSignup;
