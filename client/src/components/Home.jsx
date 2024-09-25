import { useSelector } from "react-redux";
import Header from "../assets/header.jpg";
import "./css/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <header className="home-header">
        <img className="fill" src={Header} alt="header" />
        <section className="home-content">
          <h1>Your smile is our priority</h1>
          {currentUser || currentUser.role === "Patient" ? (
            <div className="buttons">
              {currentUser && currentUser.role !== "Patient" ? (
                <></>
              ) : (
                <Link to="/clinics">
                  <button>View Clinics</button>
                </Link>
              )}
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
          )}
        </section>
      </header>
    </div>
  );
};

export default Home;
