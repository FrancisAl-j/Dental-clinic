import ReactPaginate from "react-paginate";
import "./viewServices.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  getClinic,
  clearClinic,
} from "../../../redux/clinic/patientClinicReducer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../header/Header";

const ViewServices = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [services, setServices] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();
  const { id } = useParams();
  const clinic = useSelector((state) => state.patientClinic.clinic);

  // Fetching clinic details
  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/clinic/view/${id}`, {
          withCredentials: true,
        });

        dispatch(getClinic(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchClinic();

    return () => {
      dispatch(clearClinic());
    };
  }, [id, dispatch]);

  // Paginated services
  useEffect(() => {
    currentPage.current = 1;
    getPaginateServices();

    return () => {
      setServices([]);
    };
  }, []);

  const handlePageClick = async (e) => {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginateServices();
  };
  1;

  const getPaginateServices = async () => {
    const clinicId = id;
    try {
      const res = await axios.get(
        `http://localhost:5000/service/paginated/services?page=${currentPage.current}&limit=${limit}`,
        {
          // You use this for finding the id I don't know about the others
          params: {
            clinicId: id,
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setServices(res.data.result);
        setPageCount(res.data.results.pageCount);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="services-main">
      <Header clinic={clinic} />
      <h1>Services</h1>
      <div className="services-wrapper">
        {services.map((service) => {
          return (
            <div key={service._id} className="service-wrapper">
              <div className="service-name-container">
                <img src={service.imageLogo} alt="" />
                <h1>{service.name}</h1>
              </div>
              <div className="features-container">
                {service.features.map((feature, index) => {
                  return <h1 key={index}>{feature}</h1>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default ViewServices;
