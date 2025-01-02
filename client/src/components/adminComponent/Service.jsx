import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./service.css";
import Sidebar from "../sidebar/Sidebar";
import { useSelector } from "react-redux";
import Close from "../../assets/close.svg";
import { specialized_set } from "../../DataServices.jsx";
import { specialized_data } from "../specialize.jsx";

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

import { data_set } from "../../DataServices.jsx";

const Service = () => {
  const { currentClinic } = useSelector((state) => state.clinic);
  const { currentUser } = useSelector((state) => state.user);
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
  const [dentists, setDentists] = useState([]);
  const [checkedDentists, setCheckedDentists] = useState([]);
  const [sameServices] = useState(specialized_set);
  const [serviceData] = useState(specialized_data);
  const [serviceSpecialize, setServiceSpecialize] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);

  const imageLogoRef = useRef();
  const bgImageRef = useRef();

  useEffect(() => {
    if (addImageLogo) {
      handleImageLogo(addImageLogo);
    }
  }, [addImageLogo]);

  useEffect(() => {
    fetchDentists();
  }, []);

  // Handles the check
  const handleCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the selected day to the available array
      setCheckedDentists((prev) => [...prev, value]);
    } else {
      // Remove the deselected day from the available array
      setCheckedDentists((prev) => prev.filter((day) => day !== value));
    }
  };

  //console.log(dentists);

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
    const dentist = checkedDentists;
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
          dentist,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setAddFeatures([]);
        setCheckedDentists([]);
        setError(null);
        setEmptyFields([]);
        setServiceSpecialize("");
        setFormData({
          name: "",
          description: "",
          category: "",
          imageLogo: ImageLogo,
          bgImage: BgImage,
          dentist: "",
        });

        toast.success("Service created successfully!");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, emptyFields } = error.response.data;
        setError(message);
        setEmptyFields(emptyFields);
      }
    }
  };

  // FETCHING DENTISTS
  const fetchDentists = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/service/fetch/dentist",
        { withCredentials: true }
      );

      if (res.status === 200) {
        setDentists(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //console.log(checkedDentists);
  //console.log(dentists);

  return (
    <div className="service-container">
      <Sidebar />

      <form className="service-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Create Service</h1>
          <img src={currentClinic.logo} alt="logo" />
        </div>
        <hr />
        <div className="form-elements">
          <div>
            <select
              name=""
              id=""
              value={serviceSpecialize}
              onChange={(e) => setServiceSpecialize(e.target.value)}
            >
              <option disabled value="">
                Choose Specialization
              </option>
              {serviceData &&
                serviceData.map((service, index) => {
                  return (
                    <option value={service} key={index}>
                      {service}
                    </option>
                  );
                })}
            </select>
          </div>
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

          {/*<input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            /> */}

          <div className="containers-dentists">
            <span>Dentists</span>
            {dentists &&
              dentists.map((dentist, index) => {
                if (serviceSpecialize === dentist.specialize) {
                  return (
                    <div className="checkbox-pair" key={index}>
                      <input
                        type="checkbox"
                        id={dentist.name}
                        value={dentist._id}
                        onChange={handleCheck}
                      />
                      <label htmlFor={dentist.name}>{dentist.name}</label>
                    </div>
                  );
                }
              })}
          </div>

          <select
            name="name"
            id=""
            value={formData.name}
            onChange={handleChange}
          >
            <option disabled value="">
              Select a Services
            </option>
            {/*data_set &&
              data_set.map((data, index) => {
                return (
                  <option value={data.name} key={index}>
                    {data.name}
                  </option>
                );
              })*/}
            {/* Display services based on selected specialization */}

            {serviceSpecialize &&
              specialized_set[serviceSpecialize].map((service, index) => {
                return <option value={service}>{service}</option>;
              })}
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
          ></textarea>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Service;
