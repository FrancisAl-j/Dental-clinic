import React from "react";
import "./whoNeeds.css";
import {
  dental_consultation,
  tooth_pasta,
  teeth_cleaning,
  diastema_closure,
  dental_crown,
  dentures,
  dental_retainer,
  dental_bridges,
  dental_veeners,
  dental_implant,
  root_canal,
  tooth_extraction,
  clear_aligners,
  metallic_braces,
  self_ligating_brace,
  teeth_whitening,
} from "../ServiceAll";

const WhoNeeds = ({ service }) => {
  return (
    <div className="needs-container">
      <div>
        <h1>Who Needs {service}</h1>
        <section>
          {service && service === "Dental Consultation" ? (
            <div className="needs-content">
              {dental_consultation.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Teeth Cleanings" ? (
            <div className="needs-content">
              {teeth_cleaning.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Diastema Closure" ? (
            <div className="needs-content">
              {diastema_closure.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Dental Crowns" ? (
            <div className="needs-content">
              {dental_crown.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Dentures" ? (
            <div className="needs-content">
              {dentures.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Teeth Whitening" ? (
            <div className="needs-content">
              {teeth_whitening.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Tooth Pasta" ? (
            <div className="needs-content">
              {tooth_pasta.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Dental Retainers" ? (
            <div className="needs-content">
              {dental_retainer.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Clear Aligners" ? (
            <div className="needs-content">
              {clear_aligners.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Bridgework" ? (
            <div className="needs-content">
              {dental_bridges.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Dental Veneers" ? (
            <div className="needs-content">
              {dental_veeners.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Dental Implant" ? (
            <div className="needs-content">
              {dental_implant.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Root Canal Therapy" ? (
            <div className="needs-content">
              {root_canal.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Tooth Extractions" ? (
            <div className="needs-content">
              {tooth_extraction.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Metallic Braces" ? (
            <div className="needs-content">
              {metallic_braces.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : service === "Self-Ligating Braces" ? (
            <div className="needs-content">
              {self_ligating_brace.map((data, index) => {
                return (
                  <div key={index} className="needs-wrapper">
                    <h2>{data.need}</h2>
                    <span>{data.reason}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </section>
      </div>
    </div>
  );
};

export default WhoNeeds;
