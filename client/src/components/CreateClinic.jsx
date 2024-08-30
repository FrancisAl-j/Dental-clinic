import { useEffect, useState } from "react";
import { setClinic, failClinic } from "../redux/clinic/clinicReducer.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"; // <- line 6-10 importing the necessary for uploading the images to firebase
import { app } from "../firebase.js";

const CreateClinic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(0);
  const [imageError, setImageError] = useState(false); // handles error
  const [formData, setFormData] = useState({
    clinicName: "",
    location: "",
    email: "",
    phone: "",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s",
  });

  useEffect(() => {
    if (image) {
      handleFileUpdload();
    }
  }, []);

  const handleFileUpdload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Data().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            logo: downloadURL,
          });
        });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/clinic/create",
        formData,
        {
          withCredentials: true,
        }
      );

      const data = res.data;
      if (res.status === 200) {
        dispatch(setClinic(data));
        navigate("/clinic");
      } else {
        dispatch(failClinic({ message: "Something went wrong!" }));
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data); // Log error data
        dispatch(
          failClinic({
            message:
              error.response.data.message || "An unexpected error occurred.",
            code: error.response.status,
          })
        );
      } else {
        console.error("Network Error:", error);
        dispatch(failClinic({ message: "Network error. Please try again." }));
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Create Clinic</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="logo-container">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.value[0]}
            />
            <img src={formData.logo} alt="" />
          </div>
          <div className="form-element">
            <span>Clinic name</span>
            <input
              type="text"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-element">
            <span>Location</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-element">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-element">
            <span>Phone Number</span>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            ></input>
          </div>

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateClinic;
