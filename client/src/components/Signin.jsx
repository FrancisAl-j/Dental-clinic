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

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { currentUser, loading } = useSelector((state) => state.user);
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

    try {
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:5000/auth/admin/signin",
        formData,
        {
          withCredentials: true,
        }
      );
      const data = res.data;

      const clinicId = res.data.clinicId;
      if (res.status === 200) {
        if (res.data.active === true) {
          dispatch(signInSuccess(data));
        } else {
          toast.error("Please activate your account first.");
          dispatch(signInFailure());
        }
      }

      if (res.data.role === "Admin") {
        if (!clinicId) {
          navigate("/create-clinic");
        } else {
          const clinic = await axios.get(
            `http://localhost:5000/clinic/${clinicId}`,
            {
              withCredentials: true,
            }
          );

          dispatch(setClinic(clinic.data));

          navigate("/clinic");
        }
      } else if (res.data.role === "Assistant" || res.data.role === "Cashier") {
        const clinic = await axios.get(
          `http://localhost:5000/clinic/${clinicId}`,
          {
            withCredentials: true,
          }
        );

        dispatch(setClinic(clinic.data));

        navigate("/clinic");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(message);
      }
    }
  };

  return (
    <div className="form-body">
      <div className="form-container">
        <h1>Sign in to Clinic</h1>

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
        <Link to="/patient-signin">
          <button className="next-btn">For patients</button>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
