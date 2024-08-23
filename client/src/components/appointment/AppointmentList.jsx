import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAppoinmentStart,
  getAppoinmentSuccess,
  getAppointmentFailure,
  updateAppointment,
} from "../../redux/clinic/appointmentReducer";
import axios from "axios";

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
    <div>
      {appointments.map((appointment) => {
        return (
          <div key={appointment._id}>
            <p>{appointment.patientName}</p>
            <p>{appointment.patientAge}</p>
            <p>{appointment.patientGender}</p>
            <p>{appointment.appointmentDate}</p>
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

            <button
              disabled={appointment.status === "Canceled"}
              onClick={() => updateStatus(appointment._id, appointment.status)}
            >
              Update status
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentList;
