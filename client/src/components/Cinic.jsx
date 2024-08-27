import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Clinic = ({ setPopUp }) => {
  const { currentClinic } = useSelector((state) => state.clinic);

  return (
    <div>
      <Link to="/clinic-delete">
        <button>Update your clinic</button>
      </Link>
      <Link to="/clinic/appointment-list">
        <button>Appointment List</button>
      </Link>
      <Link to="/patients">
        <button>Patient list</button>
      </Link>
      <button onClick={() => setPopUp(true)}>Add Patient</button>
      <h1>Clinic</h1>
      {currentClinic ? (
        <h1>{currentClinic.clinicName}</h1>
      ) : (
        <h1>No current clinic</h1>
      )}
    </div>
  );
};

export default Clinic;
