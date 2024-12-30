import React from "react";
import "./clinics.css";
import axios from "axios";

const DeleteClinic = ({ setClinicId, id, name, fetchClinics }) => {
  const deleteClinic = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/delete/clinic/${id}`
      );

      if (res.status === 200) {
        await fetchClinics();
        setClinicId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="popup-container">
      <section className="popup-wrapper">
        <p className="close" onClick={() => setClinicId(null)}>
          X
        </p>
        <h1>Delete Clinic?</h1>
        <p>
          Are you sure you want to delete clinic {name}? <br />{" "}
          <span>You can't undo this action</span>
        </p>
        <div className="warning-box">
          <h3>Warning!</h3>
          <p>
            By deleting this {name}, dentists, assistants, and services will
            also be deleted.
          </p>
        </div>
        <div className="btns">
          <button className="cancel" onClick={() => setClinicId(null)}>
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

export default DeleteClinic;
