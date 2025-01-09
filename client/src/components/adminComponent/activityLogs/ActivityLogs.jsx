import React, { useEffect, useState } from "react";
import "./activityLogs.css";
import axios from "axios";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/logs/activity-logs",
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setLogs(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ! Deleting All logs
  const deleteAllLogs = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/logs/delete`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        await fetchLogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="log-container">
      <button className="clear-btn" onClick={deleteAllLogs}>
        Clear All
      </button>
      {logs &&
        logs.map((log, index) => {
          return (
            <ul key={index}>
              <li>
                <b>{log.name}</b> {log.details}
              </li>
            </ul>
          );
        })}
    </div>
  );
};

export default ActivityLogs;
