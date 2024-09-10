import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./service.css";
import Sidebar from "../sidebar/Sidebar";
import { useSelector } from "react-redux";
import Close from "../../assets/close.svg";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";
import { toast } from "react-toastify";

// File images
import ImageLogo from "../../assets/imageLogo.png";
import BgImage from "../../assets/bgImage.jpg";

const Service = () => {
  const { currentClinic } = useSelector((state) => state.clinic);
  const [addFeatures, setAddFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [addImageLogo, setAddImageLogo] = useState(undefined);
  const [addBgImage, setAddBgImage] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(0);
  const [imageError, setImageError] = useState(false); // handles error
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    imageLogo: ImageLogo,
    bgImage: BgImage,
  });

  const imageLogoRef = useRef();
  const bgImageRef = useRef();

  useEffect(() => {
    if (addImageLogo) {
      handleImageLogo(addImageLogo);
    }
  }, [addImageLogo]);

  const handleImageLogo = async (addImageLogo) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + addImageLogo.name;
    const storageRef = ref(storage, fileName);

    const updloadTask = uploadBytesResumable(storageRef, addImageLogo);

    // this coded below show the percentage of loading or upload
    updloadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageLoading(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(updloadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, imageLogo: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    if (addBgImage) {
      handleBgImage(addBgImage);
    }
  }, [addBgImage]);

  const handleBgImage = async (addBgImage) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + addBgImage.name;
    const storageRef = ref(storage, fileName);

    const updloadTask = uploadBytesResumable(storageRef, addBgImage);

    // this coded below show the percentage of loading or upload
    updloadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageLoading(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(updloadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, bgImage: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFeatureChange = (e) => {
    setNewFeature(e.target.value);
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (newFeature.trim()) {
      setAddFeatures([...addFeatures, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = addFeatures.filter((_, i) => i !== index);
    setAddFeatures(updatedFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, category, imageLogo, bgImage } = formData;
    const features = addFeatures;
    try {
      const res = await axios.post(
        "http://localhost:5000/service/create",
        {
          name,
          description,
          category,
          features,
          imageLogo,
          bgImage,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("Service created successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          imageLogo: ImageLogo,
          bgImage: BgImage,
        });
        setAddFeatures([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="service-container">
      <Sidebar />

      <form className="service-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Create Services</h1>
          <img src={currentClinic.logo} alt="logo" />
        </div>
        <hr />
        <div className="form-elements">
          <div className="imageLogo-container">
            <p>Image Logo</p>
            <input
              type="file"
              name="imageLogo"
              accept="image/*"
              onChange={(e) => setAddImageLogo(e.target.files[0])}
              ref={imageLogoRef}
              hidden
            />
            <img
              onClick={() => imageLogoRef.current.click()}
              src={formData.imageLogo}
              alt=""
            />
          </div>

          <div className="bgImage-container">
            <p>Background Image</p>
            <input
              type="file"
              name="bgImage"
              onChange={(e) => setAddBgImage(e.target.files[0])}
              accept="image/*"
              ref={bgImageRef}
              hidden
            />
            <img
              onClick={() => bgImageRef.current.click()}
              src={formData.bgImage}
              alt=""
            />
          </div>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
          ></textarea>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
          />
        </div>

        <div className="features-wrapper">
          <input
            type="text"
            value={newFeature}
            onChange={handleFeatureChange}
            placeholder="Add Features"
          />
          <button onClick={handleAddFeature}>Add Feature</button>
          <div className="features-flex">
            {addFeatures.map((feature, index) => {
              return (
                <div className="feature-container" key={index}>
                  <p>{feature}</p>
                  <img
                    onClick={() => handleRemoveFeature(index)}
                    src={Close}
                    alt="close"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Service;
