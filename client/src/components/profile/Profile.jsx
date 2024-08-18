import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
} from "../../redux/user/userSlice";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username:
      currentUser.role === "Admin" ? currentUser.name : currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
  });

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
        formData,
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
  const patientDelete = async () => {
    try {
    } catch (error) {}
  };

  return (
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
        {currentUser.role === "Patient" && <span>Delete Account</span>}
        {currentUser.role === "Admin" && <span>Delete Account</span>}
      </div>
      <p className="error">{error && "Something went wrong"}</p>
    </div>
  );
};

export default Profile;
