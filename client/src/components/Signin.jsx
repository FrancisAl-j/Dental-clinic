import { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "http://localhost:5000/auth/admin/signin",
        formData
      );
      const data = res.data;

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h1>Sign in</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
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
            <span>password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button>Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
