import React, { useEffect, useState } from "react";
import "./activityLogs.css";
import axios from "axios";

const ActivityLogs = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/clinic/appointment/list",
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setAppointments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p></p>
    </div>
  );
};

export default ActivityLogs;
