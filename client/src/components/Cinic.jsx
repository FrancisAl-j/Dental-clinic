import { useSelector } from "react-redux";

const Clinic = () => {
  const { currentClinic } = useSelector((state) => state, clinic);

  return (
    <div>
      <h1>{currentClinic.clinicName}</h1>
    </div>
  );
};

export default Clinic;
