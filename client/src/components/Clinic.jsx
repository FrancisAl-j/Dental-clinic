import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../components/css/clinic.css";

const Clinic = ({ setPopUp }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentClinic } = useSelector((state) => state.clinic);

  return (
    <div className="clinic-container">
      <div className="clinic-nav">
        <ul>
          <Link to="/clinic-delete">
            <li>Update your clinic</li>
          </Link>
          <Link to="/clinic/appointment-list">
            <li>Appointment List</li>
          </Link>
          <Link to="/patients">
            <li>Patient list</li>
          </Link>
          {currentUser && currentUser.role === "Admin" && (
            <Link to="/create-assistant">
              <li>Create Employees</li>
            </Link>
          )}
        </ul>
      </div>

      <div className="clinic-content">
        <header>
          <h1>{currentClinic.clinicName}</h1>
          <button onClick={() => setPopUp(true)}>Add Patient</button>
        </header>

        <p>{currentClinic.email}</p>
      </div>
    </div>
  );
};

export default Clinic;
