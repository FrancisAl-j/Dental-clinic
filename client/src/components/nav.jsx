import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearClinic } from "../redux/clinic/clinicReducer.js";
import { signout } from "../redux/user/userSlice.js";
import { clearAppointment } from "../redux/clinic/appointmentReducer.js";
import { clearHistoryAppointment } from "../redux/clinic/historyAppointmentReducer.js";

import Login from "../assets/logout.svg";
import Signup from "../assets/register.svg";

const Nav = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentClinic } = useSelector((state) => state.clinic);

  const handleSignout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/admin/signout", {
        withCredentials: true,
      });
      dispatch(signout());
      dispatch(clearClinic());
      dispatch(clearAppointment());
      dispatch(clearHistoryAppointment());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <nav>
        <h1>Teeth-T</h1>

        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          {currentUser && currentUser.role === "Patient" && (
            <Link to="/clinics">
              <li>Clinics</li>
            </Link>
          )}
          {currentUser && currentUser.role === "Admin" && (
            <Link to="/clinic">
              <li>Clinic</li>
            </Link>
          )}
          {currentUser &&
            currentUser.role === "Admin" &&
            currentUser.clinicId && (
              <Link to="/create-assistant">
                <li>Create Employees</li>
              </Link>
            )}
          {currentUser && <span onClick={handleSignout}>Sign out</span>}
          {currentUser && currentUser.role === "Patient" && (
            <Link to="/view-appointments">
              <li>Appointments</li>
            </Link>
          )}
        </ul>

        <div className="sign-container">
          {currentUser ? (
            <Link to="/profile">
              <h1>
                {currentUser.role === "Admin"
                  ? currentUser.name
                  : currentUser.username}
              </h1>
            </Link>
          ) : (
            <div className="icon-container">
              <Link to="/patient-signin">
                <img src={Login} alt="" />
              </Link>

              <Link to="/patient-signup">
                <img src={Signup} alt="" />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
