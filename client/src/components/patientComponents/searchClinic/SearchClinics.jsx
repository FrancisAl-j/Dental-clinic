import React, { useEffect, useState } from "react";
import axios from "axios";
import "./searchClinics.css";
import { Link } from "react-router-dom";

const SearchClinics = () => {
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getSearchClinics();
  }, [query]);

  console.log(searchData);

  const getSearchClinics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/search/clinics", {
        params: { query },
        withCredentials: true,
      });
      if (res.status === 200) {
        setSearchData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="search-container">
      <div className="search-content">
        <input
          type="text"
          placeholder="Search Clinics"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="data-container">
          {searchData.map((clinic, index) => {
            return (
              <Link
                key={index}
                to={`/clinic/${clinic._id}/${clinic.clinicName}`}
              >
                <div className="data-wrapper">
                  <div className="img-container">
                    <img src={clinic.logo} alt="" />
                    <h1>{clinic.clinicName}</h1>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchClinics;
