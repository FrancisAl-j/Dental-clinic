import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Nav from "./components/nav";
import Signin from "./components/Signin";
import AdminSignUp from "./components/registers/AdminSignup";
import CreateClinic from "./components/CreateClinic";
import Clinic from "./components/Clinic";
import AssistantSignup from "./components/AssistantSignup";
import CashierSignup from "./components/registers/cashierSignup";
import PatientSignup from "./components/registers/PatientSignup";
import PatientSignin from "./components/PatientSignin";
import ViewClinics from "./components/patientComponents/ViewClinics";
import PrivateRoute from "./components/PrivateRoute";
import ViewClinic from "./components/patientComponents/ViewClinic";
import UpdateClinic from "./components/update/UpdateClinic";
import Profile from "./components/profile/Profile";
import Appointment from "./components/appointment/Appointment";
import AppointmentList from "./components/appointment/AppointmentList";
import ViewAppointment from "./components/patientComponents/ViewAppointment";
import PatientList from "./components/adminComponent/PatientList";
import AddPatient from "./components/popUp/AddPatient";
import DentalChart from "./components/Chart/DentalChart";
import Service from "./components/adminComponent/Service";
import GetServices from "./components/adminComponent/getServices/GetServices";
import GetService from "./components/adminComponent/getServices/getService";
import UpdateService from "./components/adminComponent/updateService/UpdateService";
import ViewService from "./components/patientComponents/viewService/ViewService";
import ViewServices from "./components/patientComponents/viewService/ViewServices";
import VerifyEmail from "./components/verify/verifyEmail";
import CreatePatients from "./components/adminComponent/imageOCR/CreatePatients";
import CreateChart from "./components/adminComponent/dentalChart/createChart/CreateChart";
import FetchChart from "./components/adminComponent/dentalChart/fetchChart/FetchChart";
import VerifyPayment from "./components/verifyPayment/VerifyPayment";
import Dashboard from "./components/adminComponent/dashboard/Dashboard";
import AllServices from "./components/allServices/AllServices";
import ChartSummary from "./components/patientComponents/chartSummary/ChartSummary";
import Employees from "./components/adminComponent/employees/Employees";

import "./app.css";
import { useState, useEffect } from "react";
import Footer from "./components/footer/Footer";
import MedicalHistory from "./components/patientComponents/medicalHistory/MedicalHistory";
import { useSelector } from "react-redux";

// To toast message
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [notif, setNotif] = useState(false);
  const [token, setToken] = useState("");
  const [serviceId, setServiceId] = useState(null);
  const [medical, setMedical] = useState(false);
  const [chart, setChart] = useState(false);

  const [medicalData, setMedicalData] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.role === "Patient") {
      fetchMedicalHistory();
    }
  }, [currentUser]);

  const fetchMedicalHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/medical/get", {
        withCredentials: true,
      });

      if (res.status === 200) {
        setMedicalData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BrowserRouter>
        {show && (
          <UpdateService
            setShow={setShow}
            id={serviceId}
            setServiceId={setServiceId}
          />
        )}
        {medical && (
          <MedicalHistory
            setMedical={setMedical}
            medicalData={medicalData}
            fetchMedicalHistory={fetchMedicalHistory}
          />
        )}

        {chart && <ChartSummary setChart={setChart} />}
        <ToastContainer />
        <Nav
          notif={notif}
          setNotif={setNotif}
          setMedical={setMedical}
          setChart={setChart}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/adminSignup" element={<AdminSignUp />} />
            <Route path="/patient-signin" element={<PatientSignin />} />
            <Route
              path="/patient-signup"
              element={<PatientSignup token={token} setToken={setToken} />}
            />
            <Route path="/verify/email/:token" element={<VerifyEmail />} />
            <Route path="/all/services" element={<AllServices />} />

            <Route element={<PrivateRoute />}>
              <Route path="/create-clinic" element={<CreateClinic />} />
              <Route path="/clinic" element={<Clinic />} />
              <Route path="/create-assistant" element={<AssistantSignup />} />
              <Route path="/create-cashier" element={<CashierSignup />} />
              <Route path="/clinics" element={<ViewClinics />} />
              <Route path="/clinic/:id/:name" element={<ViewClinic />} />
              <Route
                path="/clinic/:id/:name/appointment/:service/:serviceId"
                element={<Appointment />}
              />
              <Route
                path="/clinic/appointment-list"
                element={<AppointmentList />}
              />
              <Route path="/clinic-delete" element={<UpdateClinic />} />
              <Route
                path="/view-appointments"
                element={<ViewAppointment notif={notif} setNotif={setNotif} />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/chart" element={<DentalChart />} />
              <Route path="/service" element={<Service />} />
              <Route
                path="/services"
                element={
                  <GetServices setShow={setShow} setServiceId={setServiceId} />
                }
              />
              <Route
                path="/service/:id"
                element={<GetService setShow={setShow} />}
              />
              <Route
                path="/:clinicId/service/:id/:name"
                element={<ViewService />}
              />
              <Route path="/dashboard/:id" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />

              <Route
                path="/:id/:name/paginate/services"
                element={<ViewServices />}
              />
              <Route path="/image-ocr" element={<CreatePatients />} />
              <Route path="/dental-chart" element={<CreateChart />} />
              <Route path="/chart/:id" element={<FetchChart />} />
              <Route path="/verify" element={<VerifyPayment />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
