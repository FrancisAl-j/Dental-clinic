import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getClinics } from "../../redux/clinic/ClinicsReducer.js";
import { Link } from "react-router-dom";
import "./viewClinics.css";

const ViewClinics = () => {
  const dispatch = useDispatch();
  const currentClinics = useSelector((state) => state.clinics.clinics);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await axios.get("http://localhost:5000/clinic/", {
          withCredentials: true,
        });
        const data = res.data;
        dispatch(getClinics(data));
      } catch (error) {
        console.log("Error fetching clinics:", error.response || error);
      }
    };

    fetchClinics();
  }, [dispatch]);

  return (
    <div>
      <div className="clinic-nav">
        <Link to="/clinics">
          <div>Clinics</div>
        </Link>
      </div>
      <div className="clinic-content">
        <h1>Available Clinics</h1>

        <div className="clinics-container">
          {currentClinics.map((clinic) => (
            <Link
              key={clinic.id}
              to={`/clinic/${clinic.id}/${clinic.clinicName}`}
            >
              <div className="clinic-wrapper">
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
