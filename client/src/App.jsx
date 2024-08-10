import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Nav from "./components/nav";
import Signin from "./components/Signin";
import AdminSignUp from "./components/registers/AdminSignup";
import CreateClinic from "./components/CreateClinic";
import Clinic from "./components/Cinic";

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
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
