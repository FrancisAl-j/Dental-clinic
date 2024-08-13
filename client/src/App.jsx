import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Nav from "./components/nav";
import Signin from "./components/Signin";
import AdminSignUp from "./components/registers/AdminSignup";
import CreateClinic from "./components/CreateClinic";
import Clinic from "./components/Cinic";
import AssistantSignup from "./components/AssistantSignup";
import CashierSignup from "./components/registers/cashierSignup";
import PatientSignup from "./components/registers/PatientSignup";
import PatientSignin from "./components/PatientSignin";
import "./app.css";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/adminSignup" element={<AdminSignUp />} />
          <Route path="/create-clinic" element={<CreateClinic />} />
          <Route path="/clinic" element={<Clinic />} />
          <Route path="/create-assistant" element={<AssistantSignup />} />
          <Route path="/create-cashier" element={<CashierSignup />} />
          <Route path="/patient-signup" element={<PatientSignup />} />
          <Route path="/patient-signin" element={<PatientSignin />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
