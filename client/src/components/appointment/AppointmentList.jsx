import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAppoinmentStart,
  getAppoinmentSuccess,
  getAppointmentFailure,
} from "../../redux/clinic/appointmentReducer";
import axios from "axios";

const AppointmentList = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointment);

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

export default AppointmentList;
