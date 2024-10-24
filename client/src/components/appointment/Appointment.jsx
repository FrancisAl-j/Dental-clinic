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

const Appointment = () => {
  const dispatch = useDispatch();
  const { id, name } = useParams();
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
    services: "Appointment",
    appointmentTime: "",
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(false);
  const [services, setServices] = useState([]);

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
      }
    } catch (error) {
      //setError("Something went wrong!");

      toast.error("An error occured!");
    }
  };

  return (
    <div>
      {clinic && <Header clinic={clinic} />}
      <div className="flex-container">
        {clinic && (
          <div className="left-container">
            <div className="left-container-logo">
              <img src={clinic.logo} alt="" />
              <h1>{clinic.clinicName}</h1>
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

                <select
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
                </select>

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
        </div>
      </div>
    </div>
  );
};

export default Appointment;
