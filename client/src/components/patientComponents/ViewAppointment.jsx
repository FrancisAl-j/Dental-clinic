import { useEffect, useState } from "react";
import {
  getAppointmentStart,
  getAppoinmentSuccess,
  getAppointmentFailure,
  cancelStatus,
} from "../../redux/clinic/historyAppointmentReducer.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import "./viewAppointment.css";

const ViewAppointment = ({ notif, setNotif }) => {
  const dispatch = useDispatch();
  const appointments = useSelector(
    (state) => state.historyAppoinment.appointment
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [dispatch]);

  const fetchAppointments = async () => {
    try {
      dispatch(getAppointmentStart());
      const res = await axios.get("http://localhost:5000/user/appointments", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setNotif(true);
        dispatch(getAppoinmentSuccess(res.data));
      }
    } catch (error) {
      dispatch(
        getAppointmentFailure("There was a problem fetching your appointments.")
      );
    }
  };

  // cancelling or deleting appointment
  const deleteAppointment = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete it?")) {
        const res = await axios.delete(
          `http://localhost:5000/clinic/appointment/delete/${id}`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          toast.success("Successfully deleted");
          fetchAppointments();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      if (window.confirm("Are you sure you want to cancel your appointment?")) {
        const res = await axios.put(
          `http://localhost:5000/user/cancel/${id}`,
          {},
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          await fetchAppointments();
          toast.success("Appointment Canceled");
        }
      }
    } catch (error) {
      setError("Cannot cancel your appointment.");
    }
  };

  // Remove extra 0's on date
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

  return (
    <div className="view-appointment-container">
      <div className="flex-table title">
        <b>Name</b>
        <b>Clinic</b>
        <b>Date</b>
        <b>Status</b>
        <b>Action</b>
      </div>
      <hr />
      {appointments.map((appointment) => {
        return (
          <div className="flex-table" key={appointment._id}>
            <p>{appointment.patientName}</p>
            <p>{appointment.clinic}</p>
            <p>{formatDate(appointment.appointmentDate)}</p>
            <p>{appointment.status}</p>
            <div className="btns">
              <button
                disabled={
                  appointment.status === "Canceled" ||
                  appointment.status === "Confirmed" ||
                  appointment.status === "Completed"
                }
                onClick={() =>
                  cancelAppointment(appointment._id, appointment.status)
                }
              >
                {appointment.status === "Canceled"
                  ? "Appointment Canceled"
                  : "Cancel"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewAppointment;
