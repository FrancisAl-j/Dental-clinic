import { useState } from "react";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import "./css/login.css";

import { setClinic } from "../redux/clinic/clinicReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PatientSignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:5000/auth/patient/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const data = res.data;
      if (res.status === 200) {
        if (res.data.active === true) {
          dispatch(signInSuccess(data));
          navigate("/");
        } else {
          toast.error("Please activate your account first before signing in");
        }
      } else {
        dispatch(
          signInFailure({
            message: "Invalid Credentials!",
          })
        );
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(message || "An error occured");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="form-body">
      <div className="form-container">
        <h1>Sign in as Patient</h1>

        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
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
          {error && (
            <div className="error">{error || "Something went wrong!"}</div>
          )}
        </div>
        <Link to="/signin">
          <button className="next-btn">For Clinic</button>
        </Link>
      </div>
    </div>
  );
};

export default PatientSignin;
