import { useSelector } from "react-redux";

const ViewClinics = () => {
  const currentClinics = useSelector((state) => state.clinics.clinics);

  return (
    <div>
      <h1>Available Clinics</h1>

      <div className="clinics-container">
        <div key={currentClinics.id} className="clinic-wrapper">
          <h1>{currentClinics.clinicName}</h1>
        </div>
      </div>
    </div>
  );
};

export default ViewClinics;
