import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/clinic.css";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentClinic } = useSelector((state) => state.clinic);

  return (
    <div className="clinic-nav">
      <ul>
        {currentUser && currentUser.role === "Admin" && (
          <Link to="/clinic-delete">
            <li>Update your clinic</li>
          </Link>
        )}

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

        {/*currentUser && currentUser.role === "Admin" && (
          <Link to="/chart">
            <li>Dental Chart</li>
          </Link>
        )*/}
        {currentUser && currentUser.role === "Admin" && (
          <Link to="/service">
            <li>Add Services</li>
          </Link>
        )}

        {currentUser && currentUser.role === "Admin" && (
          <Link to="/dental-chart">
            <li>Chart</li>
          </Link>
        )}

        <Link to="/services">
          <li>Services</li>
        </Link>

        <Link to="/image-ocr">
          <li>Add Patients</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
