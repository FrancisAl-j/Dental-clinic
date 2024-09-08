import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssistantSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    Cpassword: "",
  });
  const [error, setError] = useState(false);

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
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/assistant/signup",
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
      if (res.status === 400) {
        setError(true);
      } else {
        toast.success("Assistant successfully created");
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h1>Create Account for assistant</h1>

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
            <span>email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <span>password</span>
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
        <p>{error && "Something went wrong"}</p>
      </div>
      <Link to="/create-cashier">
        <span>Create Cashier</span>
      </Link>
    </div>
  );
};

export default AssistantSignup;
