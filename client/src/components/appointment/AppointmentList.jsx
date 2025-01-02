import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAppoinmentStart,
  getAppoinmentSuccess,
  getAppointmentFailure,
  updateAppointment,
  clearAppointment,
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

  useEffect(() => {
    fetchAppointment();

    return () => {
      dispatch(clearAppointment());
    };
  }, [dispatch]);

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

  const handleUpdateStatus = async (e, id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/clinic/status/${id}`,
        {
          status: e.target.value,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch(updateAppointment(res.data));
        await fetchAppointment();
      }
    } catch (error) {
      console.log(error);
    }
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

  // Canceling apointments means deleting it
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this appointment?")) {
        const res = await axios.delete(
          `http://localhost:5000/clinic/appointment/delete/${id}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          await fetchAppointment();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="appointment-container">
      <Sidebar />

      <div className="appointment-content">
        <div className="list">
          <h3>Name</h3>
          <h3>Age</h3>
          <h3>Service</h3>
          <h3>Date</h3>
          <h3>Status</h3>
          <h3>Update</h3>
        </div>
        <hr />
        {appointments &&
          appointments.map((appointment) => {
            return (
              <div className="list" key={appointment._id}>
                <p className="list-content">{appointment.patientName}</p>
                <p className="list-content">{appointment.patientAge}</p>
                <p className="list-content">{appointment.services}</p>
                <CheckDate appointment={appointment} />
                {appointment.status === "Canceled" ? (
                  <p className="list-content">Canceled</p>
                ) : (
                  <select
                    value={appointment.status} // Set the select's value to the current status of the appointment
                    onChange={(e) => handleUpdateStatus(e, appointment._id)} // Pass the id and new status to the update function
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                )}

                <button onClick={() => handleDelete(appointment._id)}>
                  Delete Appointment
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AppointmentList;
