import React from "react";
import { data_images } from "./dataImage";
import "./toothImage.css";

const ToothImage = ({ occlusal, mesial, distal, buccal, lingual, crown }) => {
  return (
    <div className="tooth-wrapper">
      <img
        src={
          crown === "Ceramic Crown"
            ? data_images.CeramicCrown
            : crown === "Metallic Crown"
            ? data_images.MetalCrown
            : crown === "Porcelain Fused Metal Crown"
            ? data_images.PFMCrown
            : crown === "Gold Crown"
            ? data_images.GoldCrown
            : data_images.tooth
        }
        alt=""
      />
      <img
        src={
          occlusal === "Caries"
            ? data_images.CariesOcclusal
            : occlusal === "Composite"
            ? data_images.CompositeOcclusal
            : occlusal === "Amalgam"
            ? data_images.AmalgamOcclusal
            : occlusal === "Recurrent Caries"
            ? data_images.RecurrentCariesOcclusal
            : occlusal === "Gold Inlay/Onlay"
            ? data_images.GoldInlayOcclusal
            : occlusal === "Ceramic Inlay/Onlay"
            ? data_images.CeramicInlayOcclusal
            : occlusal === "Metal Inlay/Onlay"
            ? data_images.MetalInlayOcclusal
            : data_images.tooth
        }
        alt=""
        className="occlusal"
      />
      <img
        src={
          mesial === "Caries"
            ? data_images.CariesMesial
            : mesial === "Composite"
            ? data_images.CompositeMesial
            : mesial === "Amalgam"
            ? data_images.AmalgamMesial
            : mesial === "Recurrent Caries"
            ? data_images.RecurrentCariesMesial
            : mesial === "Gold Inlay/Onlay"
            ? data_images.GoldInlayMesial
            : mesial === "Ceramic Inlay/Onlay"
            ? data_images.CeramicInlayMesial
            : mesial === "Metal Inlay/Onlay"
            ? data_images.MetalInlayMesial
            : data_images.tooth
        }
        alt=""
        className="mesial"
      />

      <img
        src={
          distal === "Caries"
            ? data_images.CariesDistal
            : distal === "Composite"
            ? data_images.CompositeDistal
            : distal === "Amalgam"
            ? data_images.AmalgamDistal
            : distal === "Recurrent Caries"
            ? data_images.RecurrentCariesDistal
            : distal === "Gold Inlay/Onlay"
            ? data_images.GoldInlayDistal
            : distal === "Ceramic Inlay/Onlay"
            ? data_images.CeramicInlayDistal
            : distal === "Metal Inlay/Onlay"
            ? data_images.MetalInlayDistal
            : data_images.tooth
        }
        alt=""
        className="distal"
      />

      <img
        src={
          buccal === "Caries"
            ? data_images.CariesBuccal
            : buccal === "Composite"
            ? data_images.CompositeBuccal
            : buccal === "Amalgam"
            ? data_images.AmalgamBuccal
            : buccal === "Recurrent Caries"
            ? data_images.RecurrentCariesBuccal
            : buccal === "Gold Inlay/Onlay"
            ? data_images.GoldInlayBuccal
            : buccal === "Ceramic Inlay/Onlay"
            ? data_images.CeramicInlayBuccal
            : buccal === "Metal Inlay/Onlay"
            ? data_images.MetalInlayBuccal
            : data_images.tooth
        }
        alt=""
        className="buccal"
      />

      <img
        src={
          lingual === "Caries"
            ? data_images.CariesLingual
            : lingual === "Composite"
            ? data_images.CompositeLingual
            : lingual === "Amalgam"
            ? data_images.AmalgamLingual
            : lingual === "Recurrent Caries"
            ? data_images.RecurrentCariesLingual
            : lingual === "Gold Inlay/Onlay"
            ? data_images.GoldInlayLingual
            : lingual === "Ceramic Inlay/Onlay"
            ? data_images.CeramicInlayLingual
            : lingual === "Metal Inlay/Onlay"
            ? data_images.MetalInlayLingual
            : data_images.tooth
        }
        alt=""
        className="lingual"
      />
    </div>
  );
};

export default ToothImage;
