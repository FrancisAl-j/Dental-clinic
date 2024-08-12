import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const CashierSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    Cpassword: "",
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
    const { username, email, password, Cpassword } = formData;
    if (password !== password) {
      setError("Password do not match!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/cashier/signup",
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
        setError("Not authenticated!");
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="form-container">
      <h1>Create a Cashier</h1>

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
      </div>
      <Link to="/create-assistant">
        <span>Create Assistant</span>
      </Link>
    </div>
  );
};

export default CashierSignup;
