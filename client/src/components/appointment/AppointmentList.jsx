import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAppoinmentStart,
  getAppoinmentSuccess,
  getAppointmentFailure,
  updateAppointment,
} from "../../redux/clinic/appointmentReducer";
import axios from "axios";
import "./appointmentList.css";
import Sidebar from "../sidebar/Sidebar";
import CheckDate from "./CheckDate";
import Button from "./Button";

const AppointmentList = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointment);
  const { currentUser } = useSelector((state) => state.user) || [];

  const [error, setError] = useState(null);

  const handleChange = (e, id) => {
    const updatedStatus = e.target.value;
    updateStatus(id, updatedStatus);
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        dispatch(getAppoinmentStart());
        const res = await axios.get(
          "http://localhost:5000/clinic/appointment/list",
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          dispatch(getAppoinmentSuccess(res.data));
        }
      } catch (error) {
        dispatch(
          getAppointmentFailure({
            message:
              "There is something wrong with fetching the appointment lists",
          })
        );
      }
    };

    fetchAppointment();
  }, [dispatch]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    };
    let formattedDate = date.toLocaleString("en-GB", options);

    // Remove ":00" if the time is exactly on the hour (e.g., "00:00", "01:00")
    if (formattedDate.endsWith(":00")) {
      formattedDate = formattedDate.slice(0, -3); // Remove the ":00"
    }

    // If the hour is 00 and the time part was completely removed, remove the comma
    if (formattedDate.endsWith(", 00")) {
      formattedDate = formattedDate.replace(", 00", ""); // Remove ", 00"
    }

    return formattedDate; // e.g., "06/09/2024" if the time was 00:00
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/clinic/status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(updateAppointment(res.data));
        fetchAppointment();
      }
    } catch (error) {
      setError("There was a problem updating the status");
    }
  };

  return (
    <div className="appointment-container">
      <Sidebar />

      <div className="appointment-content">
        <div className="list">
          <p>Name</p>
          <p>Age</p>
          <p>Gender</p>
          <p>Date</p>
          <p>Status</p>
          <p>Update</p>
        </div>
        <hr />
        {appointments.map((appointment) => {
          return (
            <div className="list" key={appointment._id}>
              <p>{appointment.patientName}</p>
              <p>{appointment.patientAge}</p>
              <p>{appointment.patientGender}</p>
              <CheckDate appointment={appointment} />
              {appointment.status === "Canceled" ? (
                <p>Canceled</p>
              ) : (
                <select
                  value={appointment.status} // Set the select's value to the current status of the appointment
                  onChange={(e) => handleChange(e, appointment._id)} // Pass the id and new status to the update function
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              )}

              <Button appointment={appointment} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentList;
