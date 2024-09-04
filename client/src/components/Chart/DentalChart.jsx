import axios from "axios";
import { toPng } from "html-to-image";
import { useEffect, useRef, useState } from "react";
import Upload from "../../assets/upload.jpg";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"; // <- line 6-10 importing the necessary for uploading the images to firebase
import { app } from "../../firebase.js";
import Close from "../../assets/close.svg";

const DentalChart = () => {
  const elementRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [chartDetails, setChartDetails] = useState(Upload);
  const [image, setImage] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(0);
  const [imageError, setImageError] = useState(false); // handles error
  const [treatments, setTreatments] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [inputTreatments, setInputTreatments] = useState("");
  const [inputConditions, setInputConditions] = useState("");

  const fileRef = useRef(null);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const updloadTask = uploadBytesResumable(storageRef, image);

    // this coded below show the percentage of loading or upload
    updloadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageLoading(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(updloadTask.snapshot.ref).then((downloadURL) =>
          setChartDetails(downloadURL)
        );
      }
    );
  };

  // Adding array index from treatments and conditions
  const addTreatments = (e) => {
    e.preventDefault();
    if (inputTreatments.trim()) {
      setTreatments([...treatments, inputTreatments.trim()]);
      setInputTreatments("");
    }
  };

  const addConditions = (e) => {
    e.preventDefault();
    if (inputConditions.trim()) {
      setConditions([...conditions, inputConditions.trim()]);
      setInputConditions("");
    }
  };

  // Removing array indexes
  const removeTreatment = (index) => {
    const updatedTreatment = treatments.filter((_, i) => i !== index);
    setTreatments(updatedTreatment);
  };

  const removeConditions = (index) => {
    const updatedCondition = conditions.filter((_, i) => i !== index);
    setConditions(updatedCondition);
  };

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
      <form>
        <div ref={elementRef}>
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
        </div>
        <button type="button" onClick={htmlToImage}>
          Download
        </button>

        <div className="form-to-submit">
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
          />
          <img
            onClick={() => fileRef.current.click()}
            src={chartDetails}
            alt=""
          />

          <div className="treatment-container">
            <input
              type="text"
              value={inputTreatments}
              onChange={(e) => setInputTreatments(e.target.value)}
              placeholder="Treatments"
            />
            <button onClick={addTreatments} type="button">
              ADD
            </button>
            {treatments.map((treatment, index) => {
              return (
                <div key={index}>
                  <p>{treatment}</p>
                  <img
                    onClick={() => removeTreatment(index)}
                    src={Close}
                    alt=""
                  />
                </div>
              );
            })}
          </div>

          <div className="condition-container">
            <input
              type="text"
              value={inputConditions}
              onChange={(e) => setInputConditions(e.target.value)}
              placeholder="Conditions"
            />
            <button onClick={addConditions} type="button">
              ADD
            </button>
            {conditions.map((condition, index) => {
              return (
                <div key={index}>
                  <p>{condition}</p>
                  <img
                    onClick={() => removeConditions(index)}
                    src={Close}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DentalChart;
