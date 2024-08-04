import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Nav from "./components/nav";
import Signin from "./components/Signin";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
