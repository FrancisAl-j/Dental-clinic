import React from "react";
import axios from "axios";

const DeletePatient = ({ id, fetchPatients, name, setPatientId }) => {
  const deleteClinic = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/delete/patient/${id}`
      );

      if (res.status === 200) {
        await fetchPatients();
        setPatientId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="popup-container">
      <section className="popup-wrapper">
        <p className="close" onClick={() => setPatientId(null)}>
          X
        </p>
        <h1>Delete Clinic?</h1>
        <p>
          Are you sure you want to delete clinic {name}? <br />{" "}
          <span>You can't undo this action</span>
        </p>
        <div className="warning-box">
          <h3>Warning!</h3>
          <p>By deleting this {name}, You won't be able to undo it</p>
        </div>
        <div className="btns">
          <button className="cancel" onClick={() => setPatientId(null)}>
            Cancel
          </button>
          <button className="delete" onClick={deleteClinic}>
            Delete
          </button>
        </div>
      </section>
    </div>
  );
};

export default DeletePatient;
