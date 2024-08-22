import { useEffect } from "react";
import {
  getAppointmentStart,
  getAppoinmentSuccess,
  getAppointmentFailure,
} from "../../redux/clinic/historyAppointmentReducer.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const ViewAppointment = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointment);

  useEffect(() => {
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
          getAppointmentFailure(
            "There was a problem fetching your appointments."
          )
        );
      }
    };

    fetchAppointments();
  }, [dispatch]);
  return (
    <div>
      {appointments.map((appointment) => {
        return (
          <div key={appointment._id}>
            <p>{appointment.patientName}</p>
            <p>{appointment.patientAge}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewAppointment;
