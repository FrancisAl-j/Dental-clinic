import React, { useEffect, useState } from "react";
import "./employees.css";
import axios from "axios";
import Sidebar from "../../sidebar/Sidebar";
import EmployeesPopUp from "./EmployeesPopUp";

const Employees = () => {
  const [dentists, setDentists] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/get/employees`,
        { withCredentials: true }
      );
      console.log(res.data);

      if (res.status === 200) {
        const { dentists, assistants } = res.data; // ! Destructuring the objects in data.
        setDentists(dentists);
        setAssistants(assistants);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! Updating the status of employees
  const updateStatus = async (e, id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/update/employees/${id}`,
        { active: e.target.value },
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
    <div className="employees-wrapper">
      <Sidebar />
      <div className="employees-container">
        <div className="employees-header layout">
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>Role</h2>
          <h2>Actions</h2>
        </div>

        <div className="employees-content">
          {dentists &&
            dentists.map((dentist, index) => {
              return (
                <>
                  <div className="layout" key={index}>
                    <span>{dentist.name}</span>
                    <span>{dentist.email}</span>
                    <span>{dentist.type}</span>
                    <div className="btns">
                      <button onClick={() => setShow(dentist._id)}>
                        Delete
                      </button>
                      <select
                        name=""
                        id=""
                        value={dentist.active}
                        onChange={(e) => updateStatus(e, dentist._id)}
                      >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </select>
                    </div>
                  </div>
                  {show === dentist._id && (
                    <EmployeesPopUp
                      setShow={setShow}
                      name={dentist.name}
                      role={dentist.type}
                      id={dentist._id}
                      fetchEmployees={fetchEmployees}
                    />
                  )}
                </>
              );
            })}

          {assistants &&
            assistants.map((assistant, index) => {
              return (
                <>
                  <div className="layout" key={index}>
                    <span>{assistant.username}</span>
                    <span>{assistant.email}</span>
                    <span>{assistant.role}</span>
                    <div className="btns">
                      <button onClick={() => setShow(assistant._id)}>
                        Delete
                      </button>
                      <select
                        name=""
                        id=""
                        value={assistant.active}
                        onChange={(e) => updateStatus(e, assistant._id)}
                      >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </select>
                    </div>
                  </div>
                  {show === assistant._id && (
                    <EmployeesPopUp
                      setShow={setShow}
                      name={assistant.username}
                      role={assistant.role}
                      id={assistant._id}
                      fetchEmployees={fetchEmployees}
                    />
                  )}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Employees;
