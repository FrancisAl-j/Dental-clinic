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
import "./nav.css";
import { useState } from "react";
import ArrowDown from "../assets/arrow.svg";
import Logout from "../assets/signout.svg";
import Appointment from "../assets/appointment.svg";
import Home from "../assets/home.svg";
import Clinics from "../assets/clinics.svg";
import About from "../assets/about.svg";

const Nav = ({ setMedical, setChart }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentClinic } = useSelector((state) => state.clinic);
  const appointments = useSelector(
    (state) => state.historyAppoinment.appointment
  );

  const [show, setShow] = useState(false);

  const notifOff = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/clinic/notif",
        { notif: false },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        console.log("Successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleShow = (e) => {
    setShow((prevState) => !prevState);
  };

  return (
    <header>
      <nav>
        <Link to="/">
          <h1>Dental-Suite</h1>
        </Link>

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
        </ul>

        <div className="sign-container">
          {currentUser ? (
            <div className="profile-container">
              {/*<h1> 
                {currentUser.role === "Admin"
                  ? currentUser.name
                  : currentUser.username}
              </h1> </Link>*/}
              <div className="profile-wrapper" onClick={handleShow}>
                {currentUser && currentUser.role === "Admin" ? (
                  <p>{currentUser.name}</p>
                ) : (
                  <p>{currentUser.username}</p>
                )}
                <img src={Profile} alt="" />
                <img src={ArrowDown} alt="" className="arrow" />
                {currentUser &&
                  currentUser.role === "Patient" &&
                  appointments &&
                  appointments.map((appointment, index) => {
                    return (
                      <div
                        className={appointment.notif ? "red-dot" : undefined}
                        key={index}
                      ></div>
                    );
                  })}
              </div>

              {show && (
                <div className="hide-container">
                  {currentUser && (
                    <ul onClick={handleShow}>
                      <div className="small-screen">
                        <Link to="/">
                          <li>
                            <img src={Home} alt="" />
                            <p>Home</p>
                          </li>
                        </Link>
                        <Link to="/about">
                          <li>
                            <img src={About} alt="" />
                            <p>About</p>
                          </li>
                        </Link>
                        {currentUser && currentUser.role === "Patient" && (
                          <Link to="/clinics">
                            <li>
                              <img src={Clinics} alt="" />
                              <p>Clinics</p>
                            </li>
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
                      </div>

                      <Link to="/profile">
                        <li>
                          <img src={Profile} alt="" />
                          <p>Profile</p>
                        </li>
                      </Link>

                      <li onClick={handleSignout}>
                        <img src={Logout} alt="" />
                        <p className="sign-out">Sign out</p>
                      </li>

                      {currentUser && currentUser.role === "Patient" && (
                        <Link to="/view-appointments" onClick={notifOff}>
                          <li>
                            <img src={Appointment} alt="" />
                            <p>Appointments</p>
                          </li>
                        </Link>
                      )}

                      {currentUser && currentUser.role === "Patient" && (
                        <li onClick={() => setChart(true)}>
                          <img src={Appointment} alt="" />
                          <p>Chart</p>
                        </li>
                      )}

                      {currentUser && currentUser.role === "Patient" && (
                        <li onClick={() => setMedical(true)}>
                          <img src={Appointment} alt="" />
                          <p>Medical History</p>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              )}
            </div>
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
