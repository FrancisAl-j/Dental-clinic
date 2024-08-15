import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setClinic } from "../../redux/clinic/clinicReducer.js";
import { useEffect } from "react";
import axios from "axios";

const ViewClinic = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentClinic } = useSelector((state) => state.clinic);

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/clinic/view/${id}`, {
          withCredentials: true,
        });

        dispatch(setClinic(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchClinic();
  }, [id]);

  return (
    <div>
      <h1>{currentClinic.clinicName}</h1>
      <h3>{currentClinic.location}</h3>
      <span>{currentClinic.email}</span>
    </div>
  );
};

export default ViewClinic;
