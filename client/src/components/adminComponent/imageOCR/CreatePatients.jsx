import React, { useRef, useState } from "react";
import "./createPatients.css";
import Sidebar from "../../sidebar/Sidebar";
import UploadImage from "../../../assets/uploadImage.svg";
import axios from "axios";

const CreatePatients = () => {
  const [image, setImage] = useState(false);

  const handleImageOcr = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("image", image);
      const res = await axios.post(
        "http://localhost:5000/list/image-ocr",
        formData,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fileRef = useRef(null);
  return (
    <div>
      <Sidebar />
      <section className="image-ocr-content">
        <h1>Upload an image to create a patients</h1>
        <form onSubmit={handleImageOcr}>
          <input
            type="file"
            value=""
            accept="image/*"
            ref={fileRef}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={image ? URL.createObjectURL(image) : UploadImage}
            alt=""
            onClick={() => fileRef.current.click()}
          />
          <button>Extract</button>
        </form>
      </section>
    </div>
  );
};

export default CreatePatients;
