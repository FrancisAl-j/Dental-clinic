import React from "react";
import Checked from "../../../assets/green-check.svg";
import Unchecked from "../../../assets/gray-check.svg";

const Inclusion = ({ type }) => {
  return (
    <section className="inclusion">
      <ul className="inclusion-list">
        <li>
          <img src={Checked} alt="" />
          <span>
            Clinic on platform for{" "}
            {type === "Basic"
              ? "3"
              : type === "Standard"
              ? "6"
              : type === "Premium"
              ? "1"
              : ""}{" "}
            {type === "Premium" ? "year" : "months"}
          </span>
        </li>
        <li>
          <img src={Checked} alt="" />
          <span>Manually add patient</span>
        </li>

        <li>
          <img src={Checked} alt="" />
          <span>Create services for your clinic</span>
        </li>

        <li>
          <img src={type === "Basic" ? Unchecked : Checked} alt="" />
          <span>Insert many patient using image</span>
        </li>

        <li>
          <img src={type === "Premium" ? Checked : Unchecked} alt="" />
          <span>Dental Chart</span>
        </li>
      </ul>
    </section>
  );
};

export default Inclusion;
