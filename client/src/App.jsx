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
import "./app.css";
import { useState } from "react";

// To toast message
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [popUp, setPopUp] = useState(false);
  return (
    <>
      <BrowserRouter>
        {popUp && <AddPatient setPopUp={setPopUp} />}
        <ToastContainer />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/adminSignup" element={<AdminSignUp />} />
            <Route path="/patient-signin" element={<PatientSignin />} />
            <Route path="/patient-signup" element={<PatientSignup />} />

            <Route element={<PrivateRoute />}>
              <Route path="/create-clinic" element={<CreateClinic />} />
              <Route path="/clinic" element={<Clinic setPopUp={setPopUp} />} />
              <Route path="/create-assistant" element={<AssistantSignup />} />
              <Route path="/create-cashier" element={<CashierSignup />} />
              <Route path="/clinics" element={<ViewClinics />} />
              <Route path="/clinic/:id/:name" element={<ViewClinic />} />
              <Route
                path="/clinic/:id/:name/appointment"
                element={<Appointment />}
              />
              <Route
                path="/clinic/appointment-list"
                element={<AppointmentList />}
              />
              <Route path="/clinic-delete" element={<UpdateClinic />} />
              <Route path="/view-appointments" element={<ViewAppointment />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/chart" element={<DentalChart />} />
              <Route path="/service" element={<Service />} />
              <Route path="/services" element={<GetServices />} />
              <Route path="/service/:id" element={<GetService />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
