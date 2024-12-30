import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
} from "../../redux/user/userSlice";
import { clearClinic } from "../../redux/clinic/clinicReducer.js";
import axios from "axios";
import "../css/home.css";
import { days_data } from "../DaysData.jsx";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username:
      currentUser.role === "Admin" ? currentUser.name : currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
  });
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.available) {
      setAvailable(currentUser.available);
    }
  }, [currentUser]);

  const handleCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the selected day to the available array
      setAvailable((prev) => [...prev, parseInt(value)]);
    } else {
      // Remove the deselected day from the available array
      setAvailable((prev) => prev.filter((day) => day !== parseInt(value)));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles update user profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.put(
        `http://localhost:5000/user/update/${currentUser._id}`,
        { formData, available },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch(updateUserSuccess(res.data));
      } else {
        dispatch(
          updateUserFail({
            message: "User update failure.",
          })
        );
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          dispatch(
            updateUserFail({
              message: "User not found.",
            })
          );
        } else if (status === 401) {
          dispatch(
            updateUserFail({
              message: "Unautherized user",
            })
          );
        } else {
          dispatch(
            updateUserFail({
              message: "An unexpected error occurred. Please try again.",
            })
          );
        }
      } else {
        dispatch(
          updateUserFail({ message: "Network error. Please try again." })
        );
      }
    }
  };

  // Handles Delete account
  // Delete for patients
  const patientDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete your account?")) {
        const res = await axios.delete(
          `http://localhost:5000/user/patient/${currentUser._id}`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          dispatch(deleteUserSuccess());
        } else {
          dispatch(
            deleteUserFail({
              message: "There was a problem deleting your account!",
            })
          );
        }
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          dispatch(
            deleteUserFail({
              message: "User not found.",
            })
          );
        } else if (status === 401) {
          dispatch(
            deleteUserFail({
              message: "Unautherized user",
            })
          );
        } else {
          dispatch(
            deleteUserFail({
              message: "An unexpected error occurred. Please try again.",
            })
          );
        }
      } else {
        dispatch(
          deleteUserFail({ message: "Network error. Please try again." })
        );
      }
    }
  };

  // Delete for Admin
  const adminDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete your account?")) {
        const res = await axios.delete(
          `http://localhost:5000/user/admin/${currentUser._id}`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          dispatch(deleteUserSuccess());
          dispatch(clearClinic());
        } else {
          dispatch(
            deleteUserFail({
              message: "There was a problem deleting your account!",
            })
          );
        }
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          dispatch(
            deleteUserFail({
              message: "User not found.",
            })
          );
        } else if (status === 401) {
          dispatch(
            deleteUserFail({
              message: "Unautherized user",
            })
          );
        } else {
          dispatch(
            deleteUserFail({
              message: "An unexpected error occurred. Please try again.",
            })
          );
        }
      } else {
        dispatch(
          deleteUserFail({ message: "Network error. Please try again." })
        );
      }
    }
  };

  return (
    <div className="profiles-container">
      <div className="form-container">
        <h1>Profile</h1>

        <div className="form-wrapper">
          <form onSubmit={handleUpdate}>
            <div className="form-element">
              <span>{currentUser.role === "Admin" ? "Name" : "Username"}</span>
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

            {currentUser && currentUser.role === "Admin" && (
              <div className="form-element">
                <span>Days Available</span>
                <div className="days-container">
                  {[
                    { day: "Monday", value: 1 },
                    { day: "Tuesday", value: 2 },
                    { day: "Wednesday", value: 3 },
                    { day: "Thursday", value: 4 },
                    { day: "Friday", value: 5 },
                    { day: "Saturday", value: 6 },
                    { day: "Sunday", value: 0 },
                  ].map((data, index) => (
                    <div className="day-element" key={index}>
                      <input
                        type="checkbox"
                        id={data.day.toLowerCase()}
                        value={data.value} // Use day as the value
                        checked={available.includes(data.value) || false}
                        onChange={handleCheck}
                      />
                      <label htmlFor={data.day.toLowerCase()}>{data.day}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-element">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button disabled={loading}>
              {loading ? "Loading..." : "Update"}
            </button>
          </form>
          {currentUser.role === "Patient" && (
            <span onClick={patientDelete}>Delete Account</span>
          )}
          {currentUser.role === "Admin" && (
            <span onClick={adminDelete}>Delete Account</span>
          )}
        </div>
        <p className="error">{error && "Something went wrong"}</p>
      </div>
    </div>
  );
};

export default Profile;
