import ReactPaginate from "react-paginate";
import "./viewServices.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  getClinic,
  clearClinic,
} from "../../../redux/clinic/patientClinicReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
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

  const getPaginateServices = async () => {
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
      <h1>Services we can offer</h1>
      <div className="services-wrapper">
        {services.map((service, index) => {
          return (
            <Link
              to={`/${id}/service/${service._id}/${service.name}`}
              key={index}
            >
              <div key={service._id} className="service-wrapper">
                <div className="service-name-container">
                  <img src={service.imageLogo} alt="" />
                  <h1>{service.name}</h1>
                </div>
                <p>{service.description}</p>
                <div className="features-container">
                  {service.features.map((feature, index) => {
                    return <span key={index}>{feature}</span>;
                  })}
                </div>

                <div className="visit-now">
                  <h1>Visit Now</h1>
                </div>
                <div className="bg-image">
                  <img src={service.bgImage} alt="" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {services.length === 10 && (
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
      )}
    </div>
  );
};

export default ViewServices;
