import { useState } from "react";

const PatientSignin = () => {
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

  return (
    <div className="form-container">
      <h1>Sign in as Patient</h1>

      <div className="form-wrapper">
        <form>
          <div className="form-element">
            <span>Email</span>
            <input
              type="text"
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

          <button>Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default PatientSignin;
