import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateClinic,
  updateFailClinic,
  deleteSuccessClinic,
} from "../../redux/clinic/clinicReducer.js";
import axios from "axios";

const UpdateClinic = () => {
  const dispatch = useDispatch();
  const { currentClinic } = useSelector((state) => state.clinic);
  const [formData, setFormData] = useState({
    clinicName: currentClinic.clinicName,
    location: currentClinic.location,
    email: currentClinic.email,
    phone: currentClinic.phone,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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
      const res = await axios.put(
        `http://localhost:5000/clinic/update/${currentClinic._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      if (res.status === 200) {
        dispatch(updateClinic(data));
        setSuccess(true);
        console.log(data);
      } else {
        updateFailClinic({
          message: "Profile update failed!",
        });
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          dispatch(
            updateFailClinic({
              message: "Clinic not found.",
            })
          );
        } else if (status === 401) {
          dispatch(
            updateFailClinic({
              message: "Unautherized user",
            })
          );
        } else {
          dispatch(
            updateFailClinic({
              message: "An unexpected error occurred. Please try again.",
            })
          );
        }
      } else {
        dispatch(
          updateFailClinic({ message: "Network error. Please try again." })
        );
      }
    }
  };

  // Handling delete
  const handleDelete = async () => {
    try {
      if (
        window.confirm(
          `Are you sure you want to ${currentClinic.clinicName} along with the employees?`
        )
      ) {
        const res = await axios.delete(
          `http://localhost:5000/clinic/delete/${currentClinic._id}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          //dispatch(deleteSuccessClinic());
        }
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="form-container">
      <h1>Update clinic</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <span>Clinic Name</span>
            <input
              type="text"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <span>Address</span>
            <input
              type="text"
              name="location"
              value={formData.location}
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
            <span>Contact Number</span>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button>Update</button>
        </form>
        <span onClick={handleDelete}>Delete Clinic</span>
      </div>
      <p className="success">{success && "Clinic updated successfully"}</p>
    </div>
  );
};

export default UpdateClinic;
