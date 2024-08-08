import { useState } from "react";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);

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

      if (res.status === 200) {
        dispatch(signInSuccess(data));
      } else {
        dispatch(
          signInFailure({
            message: "Invalid Credentials!",
          })
        );
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          dispatch(
            signInFailure({
              message: "User not found. Please check your email and password.",
            })
          );
        } else if (status === 401) {
          dispatch(
            signInFailure({
              message:
                "Invalid credentials. Please check your email and password.",
            })
          );
        } else {
          dispatch(
            signInFailure({
              message: "An unexpected error occurred. Please try again.",
            })
          );
        }
      } else {
        dispatch(
          signInFailure({ message: "Network error. Please try again." })
        );
      }
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

          <button disabled={loading}>
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
