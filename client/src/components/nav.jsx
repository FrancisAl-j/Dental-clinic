import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearClinic } from "../redux/clinic/clinicReducer.js";
import { signout } from "../redux/user/userSlice.js";
import { clearAppointment } from "../redux/clinic/appointmentReducer.js";
import { clearHistoryAppointment } from "../redux/clinic/historyAppointmentReducer.js";
import { clearPatients } from "../redux/clinic/patientListReducer.js";
import Login from "../assets/logout.svg";
import Signup from "../assets/register.svg";
import Profile from "../assets/profile.svg";

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
      dispatch(clearPatients());
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
          {currentUser &&
            currentClinic &&
            currentUser.clinicId &&
            currentUser.role === "Admin" && (
              <Link to="/clinic">
                <li>Clinic</li>
              </Link>
            )}
          {currentUser &&
            currentUser.clinicId &&
            currentUser.role === "Assistant" && (
              <Link to="/clinic">
                <li>Clinic</li>
              </Link>
            )}
          {currentUser &&
            currentUser.clinicId &&
            currentUser.role === "Cashier" && (
              <Link to="/clinic">
                <li>Clinic</li>
              </Link>
            )}

          {currentUser &&
            !currentUser.clinicId &&
            currentUser.role === "Admin" && (
              <Link to="/create-clinic">
                <li>Create Clinic</li>
              </Link>
            )}

          {currentUser && currentUser.role === "Patient" && (
            <Link to="/view-appointments">
              <li>Appointments</li>
            </Link>
          )}

          {currentUser && (
            <span className="sign-out" onClick={handleSignout}>
              Sign out
            </span>
          )}
        </ul>

        <div className="sign-container">
          {currentUser ? (
            <Link to="/profile">
              {/*<h1>
                {currentUser.role === "Admin"
                  ? currentUser.name
                  : currentUser.username}
              </h1>*/}
              <img src={Profile} alt="" />
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
