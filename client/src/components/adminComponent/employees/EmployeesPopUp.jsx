import React from "react";
import "./employees.css";
import axios from "axios";

const EmployeesPopUp = ({ setShow, name, role, id, fetchEmployees }) => {
  // ! Deleting Employees
  const deleteEmployees = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/delete/employees/${id}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        await fetchEmployees();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="popup-container">
      <section className="popup-wrapper">
        <p className="close" onClick={() => setShow(null)}>
          X
        </p>
        <h1>Delete {role}?</h1>
        <p>
          Are you sure you want to delete admin {name}? <br />{" "}
          <span>You can't undo this action</span>
        </p>
        <div className="warning-box">
          <h3>Warning!</h3>
          <p>
            By deleting this {role} in clinic, You won't be able to undo this
            action
          </p>
        </div>
        <div className="btnss">
          <button className="cancel" onClick={() => setShow(null)}>
            Cancel
          </button>
          <button className="delete" onClick={deleteEmployees}>
            Delete
          </button>
        </div>
      </section>
    </div>
  );
};
export default EmployeesPopUp;
