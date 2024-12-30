import React, { useEffect, useState } from "react";
import "./chartSummary.css";
import axios from "axios";

const ChartSummary = ({ setChart }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/chart/get/notes/patient",
        { withCredentials: true }
      );

      if (res.status === 200) {
        setNotes(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="summary-container">
      <section className="summary-wrapper">
        <header>
          <h1>Chart Summary</h1>
          <h4 onClick={() => setChart(false)}>X</h4>
        </header>
        <ol>
          {notes &&
            notes.map((note, index) => {
              return <li key={index}>{note}</li>;
            })}
        </ol>
      </section>
    </div>
  );
};

export default ChartSummary;
