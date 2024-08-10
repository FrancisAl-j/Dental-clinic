import { useSelector } from "react-redux";

const Clinic = () => {
  const { currentClinic } = useSelector((state) => state.clinic);

  return (
    <div>
      <h1>Clinic</h1>
      {currentClinic ? (
        <h1>{currentClinic.clinicName}</h1>
      ) : (
        <h1>No current clinic</h1>
      )}
    </div>
  );
};

export default Clinic;
