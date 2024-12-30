import React, { useState } from "react";
import "./legend.css";
import ArrowDown from "../../../../assets/arrow-down.svg";
import ArrowUp from "../../../../assets/arrow-up.svg";
import Check from "../../../../assets/check.svg";

const Legend = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="side-legend">
      <div className="dropdown" onClick={handleShow}>
        <span>Tooth Chart Legend</span>
        <img src={show ? ArrowUp : ArrowDown} alt="" />
      </div>

      {show && (
        <ul className="legend-content">
          <li>
            <img src={Check} alt="" className="box" />
            <span>Present</span>
          </li>

          <li>
            <span>M</span>
            <span>Missing</span>
          </li>

          <li>
            <span>RF</span>
            <span>Root Fragment</span>
          </li>

          <li>
            <span>IM</span>
            <span>Impacted Tooth</span>
          </li>

          <li>
            <div className="caries-legend box"></div>
            <span>Caries</span>
          </li>

          <li>
            <div className="composite-legend box"></div>
            <span>Composite Filling</span>
          </li>

          <li>
            <div className="amalgam-legend box"></div>
            <span>Amalgam Filling</span>
          </li>

          <li>
            <div className="rc-legend box"></div>
            <span>Recurrent Caries</span>
          </li>

          <li>
            <div className="metal box"></div>
            <span>Metallic Crown</span>
          </li>

          <li>
            <div className="gold box"></div>
            <span>Gold Crown</span>
          </li>

          <li>
            <div className="ceramic box"></div>
            <span>Ceramic Crown</span>
          </li>

          <li>
            <div className="pfm box"></div>
            <span>Porcelain Fused to Metal Crown</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Legend;
