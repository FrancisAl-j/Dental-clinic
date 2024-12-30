import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getClinics, clearClinics } from "../../redux/clinic/ClinicsReducer.js";
import { Link } from "react-router-dom";
import "./viewClinics.css";
import usegeoaddress from "usegeoaddress";
import SearchClinics from "./searchClinic/SearchClinics.jsx";
import Location from "../../assets/location.svg";
import Phone from "../../assets/phone.svg";

const ViewClinics = () => {
  const { address, err, status } = usegeoaddress();
  const dispatch = useDispatch();
  const currentClinics = useSelector((state) => state.clinics.clinics);
  const [city, setCity] = useState(null); // City of user if allowed on website

  console.log("Your address is: " + city);

  if (!address || !address.city) {
    console.log("Location access denied or unavailable. Showing all clinics.");
  }

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/clinic/", {
          params: {
            city,
          },
          withCredentials: true,
        });
        const data = res.data;
        dispatch(getClinics(data));
      } catch (error) {
        console.log("Error fetching clinics:", error.response || error);
      }
    };

    if (city !== null) {
      fetchClinics(); // Fetch clinics when city changes and is not null
    } else {
      fetchClinics();
    }

    return () => {
      dispatch(clearClinics());
    };
  }, [dispatch, city]);

  useEffect(() => {
    console.log("Address received:", address);
    if (address && address.city) {
      setCity(address.city); // Set the city from geolocation data
    }
  }, [address]);

  return (
    <div className="clinics-main">
      <SearchClinics />
      <div className="clinic-content">
        <h1>Available Clinics</h1>

        <div className="clinics-container">
          {currentClinics &&
            currentClinics.map((clinic) => (
              <Link
                key={clinic.id}
                to={`/clinic/${clinic.id}/${clinic.clinicName}`}
              >
                <div className="clinic-view-wrapper">
                  <div className="image-wrapper">
                    <img src={clinic.logo} alt="logo" />
                    <h1>{clinic.clinicName}</h1>
                  </div>
                  <div className="location-container">
                    <img src={Location} alt="" />
                    <p>{clinic.location}</p>
                  </div>
                  <div className="contact-container">
                    <img src={Phone} alt="" />
                    <p>{clinic.contact}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewClinics;
