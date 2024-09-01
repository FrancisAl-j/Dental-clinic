import axios from "axios";
import { toPng } from "html-to-image";
import { useEffect, useRef, useState } from "react";

const DentalChart = () => {
  const elementRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Converting form to image
  const htmlToImage = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "dental-chart.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Searching names of patients
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/search/names", {
        params: { query },
        withCredentials: true,
      });
      if (res.status === 200) {
        setResults(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/search/names", {
          params: { query },
          withCredentials: true,
        });
        if (res.status === 200) {
          setResults(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPatients();
  }, [query]);*/

  return (
    <div>
      <form ref={elementRef}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Patients"
        />
        <button onClick={handleSearch}>Search</button>
        {results.map((patient) => {
          return (
            <div key={patient._id}>
              <h1>{patient.patientName}</h1>
            </div>
          );
        })}
        <div className="elements">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Surname" />
        </div>
      </form>
      <button onClick={htmlToImage}>Download</button>
    </div>
  );
};

export default DentalChart;
