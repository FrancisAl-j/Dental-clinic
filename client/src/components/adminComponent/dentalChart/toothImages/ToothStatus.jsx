import React from "react";
import "./toothStatus.css";
import Molar from "../../../../assets/sample/molar.png";
import Canine from "../../../../assets/sample/canine.png";
import Premolar from "../../../../assets/sample/premolar.png";
import Inicisor from "../../../../assets/sample/incisor.png";

/* 
------- Number of teeths and their types
        - in each jaw -
        incisor = 4 
        canine = 2
        premolar = 4
        molar = 6
        
        ======== This if statement condition is use if you want to get the specific number or thing that you want without affecting the sequence
        if (toothNumber >= 1 && toothNumber <= 4) { This condition will find the range from 1 - 4 only
            console.log(`This tooth is 1-4`);
        }
*/

const ToothStatus = ({ status, toothNumber }) => {
  return (
    <div className="tooth-container">
      {(toothNumber >= 1 && toothNumber <= 3) ||
      (toothNumber >= 14 && toothNumber <= 19) ||
      (toothNumber >= 30 && toothNumber <= 32) ? (
        <img src={status === "Healthy" && Molar} className="tooth"></img>
      ) : (toothNumber >= 4 && toothNumber <= 5) ||
        (toothNumber >= 12 && toothNumber <= 13) ||
        (toothNumber >= 20 && toothNumber <= 21) ||
        (toothNumber >= 28 && toothNumber <= 29) ? (
        <img src={Premolar} className="tooth" />
      ) : toothNumber === 6 ||
        toothNumber === 11 ||
        toothNumber === 22 ||
        toothNumber === 27 ? (
        <img src={Canine} className="tooth" />
      ) : (toothNumber >= 7 && toothNumber <= 10) ||
        (toothNumber >= 23 && toothNumber <= 26) ? (
        <img src={Inicisor} className="tooth" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ToothStatus;
