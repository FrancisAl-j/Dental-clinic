import React from "react";
import "./updateTooth.css";
import axios from "axios";

const UpdateTooth = ({ setToothId, id, toothId, status, toothNumber }) => {
  return (
    <form className="tooth-form">
      <header>
        <h1>Tooth # {toothNumber}</h1>
        <p onClick={() => setToothId(null)}>X</p>
      </header>
    </form>
  );
};

export default UpdateTooth;
