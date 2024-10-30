import React from "react";
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
*/

const ToothStatus = ({ status, toothNumber }) => {
  return (
    <div>
      {(toothNumber >= 1 && toothNumber <= 3) ||
      (toothNumber >= 14 && toothNumber <= 19) ||
      (toothNumber >= 30 && toothNumber <= 32) ? (
        <h1>Molar</h1>
      ) : (toothNumber >= 4 && toothNumber <= 5) ||
        (toothNumber >= 12 && toothNumber <= 13) ||
        (toothNumber >= 20 && toothNumber <= 21) ||
        (toothNumber >= 28 && toothNumber <= 29) ? (
        <h1>Premolars</h1>
      ) : toothNumber === 6 ||
        toothNumber === 11 ||
        toothNumber === 22 ||
        toothNumber === 27 ? (
        <h1>Canine</h1>
      ) : (toothNumber >= 7 && toothNumber <= 10) ||
        (toothNumber >= 23 && toothNumber <= 26) ? (
        <h1>Incisor</h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ToothStatus;
