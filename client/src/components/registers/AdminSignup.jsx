import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fName: "",
    mInitial: "",
    lName: "",
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
    const { fName, lName, mInitial, email, password, Cpassword } = formData;

    const fullname = `${fName} ${mInitial}. ${lName}`;
    if (password !== Cpassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/auth/admin/signup", {
        fullname,
        email,
        password,
        Cpassword,
      });
      navigate("/signin");
      if (res.status === 400) {
        setError(true);
      } else {
        toast.success("Activation of account sent");
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
      <h1>Admin Sign up</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Sign up</button>
        </form>
        <p>{error}</p>
        <Link to="/patient-signup">
          <span>Sign up as Patient</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSignUp;
