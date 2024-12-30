import { useDispatch, useSelector } from "react-redux";
import Header from "../assets/header.jpg";
import "./css/home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HomeContent from "./patientComponents/homeContent/HomeContent.jsx";
import Arrow from "../assets/arrow-left.svg";
import Eye from "../assets/eye.svg";
import Location from "../assets/location.svg";
import NextPage from "../assets/link.svg";

import {
  getAppointmentStart,
  getAppoinmentSuccess,
  getAppointmentFailure,
  cancelStatus,
} from "../redux/clinic/historyAppointmentReducer.js";

/* 
{currentUser &&
            (currentUser.role === "Patient" ? (
              <div className="buttons">
                <Link to="/clinics">
                  <button>View Clinics</button>
                </Link>
              </div>
            ) : (
              <div className="buttons">
                <Link to="/patient-signup">
                  <button className="signup">Sign up</button>
                </Link>

                <Link to="patient-signin">
                  <button className="signin">Sign in</button>
                </Link>
              </div>
            ))}
*/
const Home = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchAppointments();
    }
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

  // Searching Services

  const searchServices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/service/search/services",
        {
          params: { query, location },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setServices(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // OPENING IN ANOTHER WINDOW
  const newWindow = (id, name) => {
    window.open(
      `http://localhost:5173/${id}/${name}/paginate/services`,
      "_blank"
    );
  };

  return (
    <div>
      {currentUser && currentUser.role === "Patient" && (
        <section className="search-header">
          <div className="search-content">
            <div className="input-container">
              <label htmlFor="">What</label>
              <input
                type="text"
                placeholder="Enter a keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="input-container">
              <label htmlFor="">Where</label>
              <input type="text" placeholder="Enter a City" />
            </div>

            <button type="button" onClick={searchServices}>
              Find
            </button>
          </div>
        </section>
      )}

      {!currentUser && (
        <section className="search-header">
          <div className="search-content">
            <div className="input-container">
              <label htmlFor="">What</label>
              <input
                type="text"
                placeholder="Enter a keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="input-container">
              <label htmlFor="">Where</label>
              <input
                type="text"
                placeholder="Enter a City"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button type="button" onClick={searchServices}>
              Find
            </button>
          </div>
        </section>
      )}

      <header className="home-header">
        <img className="fill" src={Header} alt="header" />
        <section className="home-content">
          <h1>Your smile is our priority</h1>
          {currentUser ? (
            currentUser.role === "Patient" ? (
              <div className="buttons">
                <Link to="/clinics">
                  <button>View Clinics</button>
                </Link>
              </div>
            ) : (
              <></>
            )
          ) : (
            <div className="buttons">
              <Link to="/patient-signup">
                <button className="signup">Register</button>
              </Link>

              <Link to="patient-signin">
                <button className="signin">Sign in</button>
              </Link>
            </div>
          )}
        </section>
      </header>
      {services.length !== 0 && (
        <div className="search-result-container">
          <div className="search-results">
            {services &&
              services.map((service, index) => {
                return (
                  <div
                    key={index}
                    className="search-results-container"
                    onClick={() => setServiceId(service._id)}
                  >
                    <img src={service.imageLogo} alt="" />
                    <h4>{service.name}</h4>
                    <h4>{service.clinicId.clinicName}</h4>
                    <h5>{service.clinicId.location}</h5>
                    <h5>{service.description}</h5>
                  </div>
                );
              })}
          </div>
          <div className="search-details">
            {!serviceId && (
              <div className="no-service">
                <img src={Arrow} alt="" />
                <h1>Select a Service</h1>
              </div>
            )}
            {services &&
              services.map((service, index) => {
                if (serviceId === service._id) {
                  return (
                    <div key={index} className="result-service-container">
                      <div className="ad-container">
                        <img src={service.bgImage} alt="" />
                      </div>
                      <header>
                        <img src={service.imageLogo} alt="" />
                        <Link
                          to={`/clinic/${service.clinicId._id}/${service.clinicId.clinicName}`}
                        >
                          <button>Visit Clinic</button>
                        </Link>
                      </header>
                      <section className="service-details">
                        <h2>{service.name}</h2>
                        <div className="sub-details">
                          <h4>{service.clinicId.clinicName}</h4>
                          <div className="details-wrapper">
                            <img src={Eye} alt="" />
                            <span>{service.visited} Visited</span>
                          </div>
                        </div>
                        <div className="details-wrapper">
                          <img src={Location} alt="" />
                          <h4>{service.clinicId.location}</h4>
                        </div>
                        <h4
                          onClick={() =>
                            newWindow(
                              service.clinicId._id,
                              service.clinicId.clinicName
                            )
                          }
                          className="link-btn"
                        >
                          View All Services
                          <span>
                            <img src={NextPage} alt="" />
                          </span>
                        </h4>
                        <button>Book an appointment</button>
                      </section>

                      <section className="description-container">
                        <h4>{service.description}</h4>
                      </section>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      )}

      <HomeContent />
    </div>
  );
};

export default Home;
