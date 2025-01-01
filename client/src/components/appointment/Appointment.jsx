import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addAppointment } from "../../redux/clinic/appointmentReducer";
import {
  getClinic,
  clearClinic,
} from "../../redux/clinic/patientClinicReducer.js";
import Header from "../patientComponents/header/Header.jsx";
import "./appointment.css";
import { toast } from "react-toastify";
import { days_data } from "../DaysData.jsx";
import ServiceInfo from "../serviceDetails/serviceInfo/ServiceInfo.jsx";
import WhoNeeds from "../serviceDetails/whoNeeds/WhoNeeds.jsx";

const Appointment = () => {
  const dispatch = useDispatch();
  const { id, name, service, serviceId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const clinic = useSelector((state) => state.patientClinic.clinic);
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    midInitial: "",
    patientAge: "",
    patientGender: "Male",
    patientEmail: currentUser.email,
    patientContact: "",
    clinicId: id,
    appointmentDate: "",
    clinic: name,
    services: service,
    appointmentTime: "",
    dentist: "None",
  });
  const [dentists, setDentists] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(false);
  const [services, setServices] = useState([]);
  const [isService, setService] = useState({});

  let dentistId;
  let available;
  if (isService.dentist) {
    available = isService.dentist.available;
    dentistId = isService.dentist._id;
  }

  //Fetching services for appointment
  useEffect(() => {
    fetchServices();

    return () => {
      setServices([]);
    };
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/service/appointment/services",
        {
          params: {
            clinicId: id,
          },
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

  // Fetching clinic details
  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/clinic/view/${id}`, {
          withCredentials: true,
        });

        dispatch(getClinic(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchClinic();

    return () => {
      dispatch(clearClinic());
    };
  }, [id, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        fName,
        lName,
        midInitial,
        patientAge,
        patientGender,
        patientEmail,
        patientContact,
        clinicId,
        appointmentDate,
        clinic,
        services,
        appointmentTime,
        dentist,
      } = formData;

      const patientName = `${lName}, ${fName} ${midInitial}.`;

      const res = await axios.post(
        "http://localhost:5000/clinic/appointment",
        {
          patientName,
          patientAge,
          patientGender,
          clinicId,
          appointmentDate,
          clinic,
          patientEmail,
          patientContact,
          services,
          appointmentTime,
          dentist,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(addAppointment(res.data));

        toast.success("Successfully book an appointment.");
        setFormData({
          fName: "",
          lName: "",
          midInitial: "",
          patientAge: "",
          patientGender: "Male",
          patientEmail: currentUser.email,
          patientContact: "",
          clinicId: id,
          appointmentDate: "",
          clinic: name,
          services: "Appointment",
          appointmentTime: "",
        });
        setError(null);
      }
    } catch (error) {
      //setError("Something went wrong!");

      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(message || "an error occured.");
      } else {
        // Handle network or unexpected errors
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // FETCHING SERVICE
  useEffect(() => {
    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);
  const fetchService = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/service/fetch/${serviceId}`,
        {
          params: { serviceId },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setService(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Dentist

  /* 
    {isService && (
              <div className="left-content">
                <h1>Dr. {isService.dentist.username}</h1>
                <div className="days-available">
                  <h1>Days Available</h1>
                  {days_data.map((data, index) => {
                    // Check if the current day's value exists in the available days
                    const isAvailable = isService.dentist.available.includes(
                      data.value
                    );
                    if (isAvailable) {
                      return (
                        <div key={index} className="day">
                          <h3>{data.day}</h3>
                        </div>
                      );
                    }
                    return null; // Return null for days that are not available
                  })}
                </div>
                <div className="left-discription">
                  <h4>{isService.description}</h4>
                </div>
              </div>
            )}

            {isService.dentist && (
              <div className="left-content">
                <h1>Dr. {isService.dentist.username}</h1>
                <div className="days-available">
                  <h2>Schedule:</h2>
                  <div className="day">
                    
                  </div>
                </div>
                
              </div>
            )}

            {days_data.map((data, index) => {
                      // Check if the current day's value exists in the available days
                      const isAvailable = isService.dentist.available.includes(
                        data.value
                      );
                      if (isAvailable) {
                        return (
                          <div key={index}>
                            <h3>{data.day}</h3>
                          </div>
                        );
                      }
                      return null; // Return null for days that are not available
                    })}
  */

  return (
    <>
      <div className="appointments-container">
        {clinic && <Header clinic={clinic} />}
        <div className="flex-container">
          {isService && (
            <div className="left-container">
              <div className="left-container-logo">
                <img src={isService.imageLogo} alt="" />
                <h1>{isService.name}</h1>
              </div>

              <div className="dentists-container">
                {isService.dentist &&
                  isService.dentist.map((dentist, index) => {
                    return (
                      <div className="dentist-card" key={index}>
                        <div className="dentist-header">
                          <h1 className="dentist-name">Dr. {dentist.name}</h1>
                          <span className="dentist-icon">🦷</span>
                        </div>
                        <div className="availability-section">
                          <h2>Available Days:</h2>
                          <div className="availability-container">
                            {dentist.available &&
                              days_data.map((data, index) => {
                                const isAvailable = dentist.available.includes(
                                  data.value
                                );
                                if (isAvailable) {
                                  return (
                                    <div
                                      className="availability-day"
                                      key={index}
                                    >
                                      <h3>{data.day}</h3>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          <div className="right-container">
            <form onSubmit={handleSubmit} className="appointment-form">
              <h2 className="form-title">Book an Appointment</h2>

              <div className="form-input-container">
                <div className="form-elements">
                  <input
                    required
                    type="text"
                    name="fName"
                    placeholder="Fist name"
                    value={formData.fName}
                    onChange={handleChange}
                  />

                  <input
                    required
                    type="text"
                    name="lName"
                    placeholder="Last name"
                    value={formData.lName}
                    onChange={handleChange}
                  />

                  <input
                    required
                    type="text"
                    name="midInitial"
                    placeholder="Middle Initial"
                    value={formData.midInitial}
                    onChange={handleChange}
                  />

                  <input
                    required
                    type="email"
                    name="patientEmail"
                    value={formData.patientEmail}
                    onChange={handleChange}
                  />

                  {/*<select
                  required
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                >
                  <option value="Appointment">Appointment</option>
                  {services.map((service) => {
                    return (
                      <option key={service._id} value={service.name}>
                        {service.name}
                      </option>
                    );
                  })}
                </select>*/}

                  <input
                    required
                    type="number"
                    name="patientContact"
                    placeholder="Phone number"
                    value={formData.patientContact}
                    onChange={handleChange}
                  />

                  <input
                    required
                    type="number"
                    name="patientAge"
                    placeholder="Age"
                    value={formData.patientAge}
                    onChange={handleChange}
                  />

                  <select
                    required
                    name="patientGender"
                    value={formData.patientGender}
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  <select
                    name="dentist"
                    id=""
                    value={formData.dentist}
                    onChange={handleChange}
                  >
                    <option disabled value="None">
                      Select Dentist
                    </option>
                    {isService &&
                      isService.dentist &&
                      isService.dentist.map((dentist, index) => {
                        return (
                          <option key={index} value={dentist._id}>
                            Dr. {dentist.name}
                          </option>
                        );
                      })}
                  </select>

                  <div className="pair-elements">
                    <input
                      required
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                    />

                    <input
                      required
                      type="time"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <button>Book Appointment</button>
            </form>
            {error && <div className="error">{error}</div>}
          </div>
        </div>

        {isService && clinic && (
          <ServiceInfo
            service={service}
            description={isService.description}
            contact={clinic.contact}
          />
        )}

        <WhoNeeds service={service} />
      </div>
    </>
  );
};

export default Appointment;
