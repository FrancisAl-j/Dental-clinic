import React from "react";
import "./admin.css";
import axios from "axios";

const DeleteAdmin = ({ name, setAdminId, id, fetchAdmins }) => {
  const deleteAdmin = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/delete/admin/${id}`
      );

      if (res.status === 200) {
        await fetchAdmins();
        setAdminId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="popup-container">
      <section className="popup-wrapper">
        <p className="close" onClick={() => setAdminId(null)}>
          X
        </p>
        <h1>Delete Admin?</h1>
        <p>
          Are you sure you want to delete admin {name}? <br />{" "}
          <span>You can't undo this action</span>
        </p>
        <div className="warning-box">
          <h3>Warning!</h3>
          <p>
            By deleting this admin clinic, dentists, assistants, and services
            will also be deleted.
          </p>
        </div>
        <div className="btns">
          <button className="cancel" onClick={() => setAdminId(null)}>
            Cancel
          </button>
          <button className="delete" onClick={deleteAdmin}>
            Delete
          </button>
        </div>
      </section>
    </div>
  );
};

export default DeleteAdmin;
