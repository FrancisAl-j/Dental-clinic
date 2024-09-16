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

const ViewAppointment = () => {
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

  const cancelAppointment = async (id, status) => {
    try {
      if (window.confirm("Are you sure you want to cancel your appointment?")) {
        const res = await axios.put(
          `http://localhost:5000/user/cancel/${id}`,
          { status },
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          dispatch(cancelStatus(res.data));
        }
      }
    } catch (error) {
      setError("Cannot cancel your appointment.");
    }
  };

  return (
    <div>
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
            <p>{appointment.appointmentDate}</p>
            <p>{appointment.status}</p>
            <div className="btns">
              <button
                disabled={appointment.status === "Canceled"}
                onClick={() =>
                  cancelAppointment(appointment._id, appointment.status)
                }
              >
                {appointment.status === "Canceled"
                  ? "Appointment Canceled"
                  : "Cancel"}
              </button>
              <button onClick={() => deleteAppointment(appointment._id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewAppointment;
