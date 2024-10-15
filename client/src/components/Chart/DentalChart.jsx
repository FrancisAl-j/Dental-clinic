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
  const [addChartDetails, setAddChartDetails] = useState(Upload);
  const [image, setImage] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(0);
  const [imageError, setImageError] = useState(false); // handles error
  const [addTreatments, setAddTreatments] = useState([]);
  const [addConditions, setAddConditions] = useState([]);
  const [inputTreatments, setInputTreatments] = useState("");
  const [inputConditions, setInputConditions] = useState("");
  const [patient, setPatient] = useState(undefined);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    optionPatients();
  }, []);

  const optionPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/list/option", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setOptions(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePatientChange = () => {
    const selectedPatient = options.find((p) => p._id === e.target.value);
    setPatient(selectedPatient);
  };

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
          setAddChartDetails(downloadURL)
        );
      }
    );
  };

  // Adding array index from treatments and conditions
  const handleTreatments = (e) => {
    e.preventDefault();
    if (inputTreatments.trim()) {
      setAddTreatments([...addTreatments, inputTreatments.trim()]);
      setInputTreatments("");
    }
  };

  const handleConditions = (e) => {
    e.preventDefault();
    if (inputConditions.trim()) {
      setAddConditions([...addConditions, inputConditions.trim()]);
      setInputConditions("");
    }
  };

  // Removing array indexes
  const removeTreatment = (index) => {
    const updatedTreatment = addTreatments.filter((_, i) => i !== index);
    setAddTreatments(updatedTreatment);
  };

  const removeConditions = (index) => {
    const updatedCondition = addConditions.filter((_, i) => i !== index);
    setAddConditions(updatedCondition);
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

  const handleSubmit = async (e, patientId) => {
    e.preventDefault();
    const treatments = addTreatments;
    const conditions = addConditions;
    const chartDetails = addChartDetails;
    try {
      const res = await axios.post(
        "http://localhost:5000/dental/create-record",
        {
          treatments,
          conditions,
          chartDetails,
          patientId,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div ref={elementRef}>
        <select value={patient} onChange={(e) => setPatient(e.target.value)}>
          <option value="Select Patient">Select Patient</option>
          {options.map((option, index) => {
            return (
              <option key={index} value={option.patientName}>
                {option.patientName}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Patients"
        />
        <button onClick={handleSearch}>Search</button>
        {results.map((result) => {
          return (
            <div key={result._id}>
              <h1>{result.patientName}</h1>
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

      {options.map((patient, index) => {
        return (
          <div key={index}>
            <form onSubmit={(e) => handleSubmit(e, patient.patientId)}>
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
                  src={addChartDetails}
                  alt=""
                />

                <div className="treatment-container">
                  <input
                    type="text"
                    value={inputTreatments}
                    onChange={(e) => setInputTreatments(e.target.value)}
                    placeholder="Treatments"
                  />
                  <button onClick={handleTreatments} type="button">
                    ADD
                  </button>
                  {addTreatments.map((treatment, index) => {
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
                  <button onClick={handleConditions} type="button">
                    ADD
                  </button>
                  {addConditions.map((condition, index) => {
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
      })}
    </div>
  );
};

export default DentalChart;
