import { useEffect, useState } from "react";
import "./getService.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import UpdateService from "../updateService/UpdateService";

const GetService = () => {
  const [service, setService] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/service/get/${id}`, {
          withCredentials: true,
        });
        setService(res.data);
        console.log(res.data);
      } catch (error) {
        setError("Something went wrong fetching service");
      }
    };

    fetchService();
  }, [id]);

  return (
    <div>
      {show && <UpdateService setShow={setShow} service={service} />}
      <div className="service-header">
        <h1>{service.name}</h1>
        <div className="service-btn">
          <button className="update" onClick={() => setShow(true)}>
            Update Service
          </button>
          <button className="delete">Delete Service</button>
        </div>
      </div>
      <section className="background">
        <img src={service.bgImage} alt="" />
        <button>Book an appointment now!</button>
      </section>
    </div>
  );
};

export default GetService;
