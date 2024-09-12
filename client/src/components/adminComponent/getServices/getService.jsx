import { useEffect, useState } from "react";
import "./getService.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  getServiceStart,
  getServiceSuccess,
  clearService,
} from "../../../redux/clinic/services/serviceReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GetService = ({ setShow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const service = useSelector((state) => state.service.service);
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
        if (res.status === 200) {
          dispatch(getServiceSuccess(res.data));
        }
      } catch (error) {
        setError("Something went wrong fetching service");
      }
    };

    fetchService();

    return () => {
      dispatch(clearService());
    };
  }, [id, dispatch]);

  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this service?")) {
        const res = await axios.delete(
          `http://localhost:5000/service/delete/${id}`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          toast.success("Service deleted");
          navigate("/clinic");
        }
      }
    } catch (error) {
      toast.error("There was a problem deleting service");
    }
  };

  return (
    <div>
      <div className="service-header">
        <h1>{service.name}</h1>
        <div className="service-btn">
          <button className="update" onClick={() => setShow(true)}>
            Update Service
          </button>
          <button onClick={handleDelete} type="button" className="delete">
            Delete Service
          </button>
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
