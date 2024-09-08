import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../viewClinic.css";

const Header = ({ clinic }) => {
  // const clinic = useSelector((state) => state.patientClinic.clinic);

  if (!clinic) {
    return <div>Loading...</div>; // Render this while clinic is loading
  }
  return (
    <header className="clinic-header">
      <Link to={`/clinic/${clinic._id}/${clinic.clinicName}`}>
        <section className="logo-container">
          <img src={clinic.logo} alt="" />
          <h1>{clinic.clinicName}</h1>
        </section>
      </Link>

      <Link to={`/clinic/${clinic.id}/${clinic.clinicName}/appointment`}>
        <button>Book an appointment</button>
      </Link>
    </header>
  );
};

export default Header;