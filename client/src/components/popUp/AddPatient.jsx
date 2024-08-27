import Close from "../../assets/close.svg";
import "./popup.css";

const AddPatient = ({ setPopUp }) => {
  return (
    <div className="popup">
      <div className="popup-container">
        <div className="logo-header">
          <h1>Add a patient</h1>
          <img onClick={() => setPopUp(false)} src={Close} alt="Close" />
        </div>
        <form>
          <div className="popup-element">
            <input type="text" placeholder="Patient Name" />
            <input type="text" placeholder="Patient Age" />
            <input type="email" placeholder="Email" />
            <select name="patientGender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="number" placeholder="Contact Number" />
          </div>

          <button>Create</button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
