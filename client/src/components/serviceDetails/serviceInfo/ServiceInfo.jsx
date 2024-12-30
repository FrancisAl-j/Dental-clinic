import React from "react";
import "./serviceInfo.css";
import { serviceImg } from "../ServiceAll";

const ServiceInfo = ({ service, description, contact }) => {
  return (
    <div className="service-info-container">
      <section>
        <div className="service-info-content">
          <h1>{service}</h1>
          <span>{description}</span>
          <button>Contact Us: +63 {contact}</button>
        </div>
      </section>
      <section className="img-service">
        <img
          src={
            service === "Dental Consultation"
              ? serviceImg.dentalConsultation
              : service === "Dental Crowns"
              ? serviceImg.dentalCrown
              : service === "Teeth Cleanings"
              ? serviceImg.teethCleaning
              : service === "Diastema Closure"
              ? serviceImg.diastemaClosure
              : service === "Dental Veneers"
              ? serviceImg.dentalVeener
              : service === "Clear Aligners"
              ? serviceImg.clearRetainer
              : service === "Bridgework"
              ? serviceImg.dentalBridge
              : service === "Metallic Braces"
              ? serviceImg.metallicBraces
              : service === "Self-Ligating Braces"
              ? serviceImg.selfLigating
              : service === "Teeth Whitening"
              ? serviceImg.teethWhitening
              : service === "Dental Implant"
              ? serviceImg.dentalImplant
              : service === "Dentures"
              ? serviceImg.denture
              : service === "Tooth Extractions"
              ? serviceImg.toothExtraction
              : service === "Root Canal Therapy"
              ? serviceImg.rootCanal
              : service === "Dental Retainers"
              ? serviceImg.dentalRetainer
              : service === "Tooth Pasta"
              ? serviceImg.toothPasta
              : ""
          }
          alt=""
        />
      </section>
    </div>
  );
};

export default ServiceInfo;
