import { useEffect, useState } from "react";
import "./getService.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const GetService = () => {
  const [service, setService] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <h1>{service.name}</h1>
    </div>
  );
};

export default GetService;
