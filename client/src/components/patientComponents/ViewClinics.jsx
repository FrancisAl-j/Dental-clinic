import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getClinics, clearClinics } from "../../redux/clinic/ClinicsReducer.js";
import { Link } from "react-router-dom";
import "./viewClinics.css";
import usegeoaddress from "usegeoaddress";
import SearchClinics from "./searchClinic/SearchClinics.jsx";

const ViewClinics = () => {
  const { address, err, status } = usegeoaddress();
  const dispatch = useDispatch();
  const currentClinics = useSelector((state) => state.clinics.clinics);
  const [city, setCity] = useState(null); // City of user if allowed on website

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

    fetchClinics();

    return () => {
      dispatch(clearClinics());
    };
  }, [dispatch]);

  useEffect(() => {
    if (address && address.city) {
      setCity(address.city); // Set the city from geolocation data
    }
  }, [address]);

  return (
    <div>
      <SearchClinics />
      <div className="clinic-content">
        <h1>Available Clinics</h1>

        <div className="clinics-container">
          {currentClinics.map((clinic) => (
            <Link
              key={clinic.id}
              to={`/clinic/${clinic.id}/${clinic.clinicName}`}
            >
              <div className="clinic-wrapper">
                <img src={clinic.logo} alt="logo" />
                <h1>{clinic.clinicName}</h1>
                <p>{clinic.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewClinics;
