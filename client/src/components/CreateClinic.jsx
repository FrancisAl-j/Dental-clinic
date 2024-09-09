import { useEffect, useRef, useState } from "react";
import { setClinic, failClinic } from "../redux/clinic/clinicReducer.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage"; // <- line 6-10 importing the necessary for uploading the images to firebase
import { app } from "../firebase.js";

import "./css/createClinic.css";

// For Philippines address
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { toast } from "react-toastify";

const CreateClinic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(undefined);
  const [background, setBackground] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(0);
  const [imageError, setImageError] = useState(false); // handles error
  const [formData, setFormData] = useState({
    clinicName: "",
    email: "",
    phone: "",
    details: "",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s",
    background:
      "https://www.shutterstock.com/image-photo/white-healthy-tooth-different-tools-600nw-1069579256.jpg",
  });

  // For address
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);

  const [regionAddr, setRegionAddr] = useState("");
  const [provinceAddr, setProvinceAddr] = useState("");
  const [cityAddr, setCityAddr] = useState("");
  const [barangayAddr, setBarangayAddr] = useState("");
  const [street, setStreet] = useState("");

  const fileRef = useRef(null);
  const backgroundRef = useRef(null);

  // Address
  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e) => {
    setRegionAddr(e.target.selectedOptions[0].text);
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e) => {
    setProvinceAddr(e.target.selectedOptions[0].text);
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e) => {
    setCityAddr(e.target.selectedOptions[0].text);
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
  };

  const brgy = (e) => {
    setBarangayAddr(e.target.selectedOptions[0].text);
  };

  useEffect(() => {
    region();
  }, []);
  // End of Address code

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const updloadTask = uploadBytesResumable(storageRef, image);

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
          setFormData({ ...formData, logo: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    if (background) {
      handleBackgroundImage(background);
    }
  }, [background]);

  const handleBackgroundImage = async (background) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + background.name;
    const storageRef = ref(storage, fileName);

    try {
      const uploadSnapshot = await uploadBytes(storageRef, background);

      const downloadURL = await getDownloadURL(uploadSnapshot.ref);

      setFormData({ ...formData, background: downloadURL });
    } catch (error) {
      console.log(error);
    }
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

    const { clinicName, details, email, phone, logo, background } = formData;
    const location = `${street} St. ${barangayAddr}, ${cityAddr}`;

    try {
      const res = await axios.post(
        "http://localhost:5000/clinic/create",
        {
          clinicName,
          location,
          email,
          logo,
          phone,
          details,
          background,
        },
        {
          withCredentials: true,
        }
      );

      const data = res.data;
      if (res.status === 200) {
        dispatch(setClinic(data));
        navigate("/clinic");
        toast.success("Clinic successfully created");
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
            <span>Logo</span>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              className="logo"
              onClick={() => fileRef.current.click()}
              src={formData.logo}
              alt=""
            />
          </div>

          <div className="background-image">
            <span>Background</span>
            <input
              type="file"
              accept="image/*"
              ref={backgroundRef}
              onChange={(e) => setBackground(e.target.files[0])}
              hidden
            />

            <img
              src={formData.background}
              alt=""
              onClick={() => backgroundRef.current.click()}
            />
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
            <span>Details</span>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="5"
            ></textarea>
          </div>

          <div className="form-element">
            <span>Address</span>
            <hr />
            <div className="form-element">
              <span>Region</span>
              <select onChange={province} onSelect={region}>
                <option disabled>Select Region</option>
                {regionData &&
                  regionData.length > 0 &&
                  regionData.map((item, index) => (
                    <option key={index} value={item.region_code}>
                      {item.region_name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="pair-elements">
              <div className="form-element">
                <span>Province</span>
                <select onChange={city}>
                  <option disabled>Select Province</option>
                  {provinceData &&
                    provinceData.length > 0 &&
                    provinceData.map((item, index) => (
                      <option key={index} value={item.province_code}>
                        {item.province_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-element">
                <span>City</span>
                <select onChange={barangay}>
                  <option disabled>Select City</option>
                  {cityData &&
                    cityData.length > 0 &&
                    cityData.map((item, index) => (
                      <option key={index} value={item.city_code}>
                        {item.city_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="pair-elements">
              <div className="form-element">
                <span>Street</span>
                <input
                  type="text"
                  name="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <div className="form-element">
                <span>Barangay</span>
                <select onChange={brgy}>
                  <option disabled>Select Barangay</option>
                  {barangayData &&
                    barangayData.length > 0 &&
                    barangayData.map((item, index) => (
                      <option key={index} value={item.brgy_code}>
                        {item.brgy_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
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
