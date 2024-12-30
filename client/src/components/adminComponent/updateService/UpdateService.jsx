import { useEffect, useRef, useState } from "react";
import "./updateService.css";
import Close from "../../../assets/close.svg";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase.js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import {
  updateServiceStart,
  updateServiceSuccess,
} from "../../../redux/clinic/services/serviceReducer.js";
import {
  getServiceSuccess,
  clearService,
} from "../../../redux/clinic/services/serviceReducer.js";

const UpdateService = ({ setShow, id, setServiceId }) => {
  const dispatch = useDispatch();
  const service = useSelector((state) => state.service.service);
  const [imageLogo, setImageLogo] = useState(undefined);
  const [bgImage, setBgImage] = useState(undefined);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageLogo: "",
    bgImage: "",
  });

  useEffect(() => {
    // Update formData when service data is fetched
    if (service) {
      setFormData({
        name: service.name || "",
        description: service.description || "",
        imageLogo: service.imageLogo || "",
        bgImage: service.bgImage || "",
      });
    }
  }, [service]);

  const imageLogoRef = useRef(null);
  const bgImageRef = useRef(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/service/get/${id}`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          dispatch(getServiceSuccess(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchService();

    return () => {
      dispatch(clearService());
    };
  }, [id, dispatch]);

  const closeX = () => {
    setShow(null);
    setServiceId(null);
  };

  console.log(service);

  // Handles Image Logo
  useEffect(() => {
    if (imageLogo) {
      handleImageLogo(imageLogo);
    }
  }, [imageLogo]);

  const handleImageLogo = async (imageLogo) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageLogo.name;
    const storageRef = ref(storage, fileName);

    try {
      const uploadSnapshot = await uploadBytes(storageRef, imageLogo);

      const downloadURL = await getDownloadURL(uploadSnapshot.ref);

      setFormData({ ...formData, imageLogo: downloadURL });
    } catch (error) {
      console.log(error);
    }
  };

  // Handles background image
  useEffect(() => {
    if (bgImage) {
      handleBgImage(bgImage);
    }
  }, [bgImage]);

  const handleBgImage = async (bgImage) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + bgImage.name;
    const storageRef = ref(storage, fileName);

    try {
      const uploadSnapshot = await uploadBytes(storageRef, bgImage);

      const downloadURL = await getDownloadURL(uploadSnapshot.ref);

      setFormData({ ...formData, bgImage: downloadURL });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateServiceStart());
      const res = await axios.put(
        `http://localhost:5000/service/update/${service._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("Successfully updated");
        dispatch(updateServiceSuccess(res.data));
      }
      console.log(res.data);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  return (
    <div className="update-service-container">
      <form onSubmit={handleUpdate}>
        <div className="form-header">
          <h1>Update Service</h1>
          <img onClick={closeX} src={Close} alt="close" />
        </div>
        <div className="image-logo-container">
          <p>Image Logo</p>
          <input
            type="file"
            name="imageLogo"
            onChange={(e) => setImageLogo(e.target.files[0])}
            accept="image/*"
            ref={imageLogoRef}
            hidden
          />
          <img
            src={formData.imageLogo}
            alt=""
            onClick={() => imageLogoRef.current.click()}
          />
        </div>

        <div className="bgImage-container">
          <p>Background Image</p>
          <input
            type="file"
            name="imageLogo"
            onChange={(e) => setBgImage(e.target.files[0])}
            accept="image/*"
            ref={bgImageRef}
            hidden
          />
          <img
            src={formData.bgImage}
            alt=""
            onClick={() => bgImageRef.current.click()}
          />
        </div>

        <div className="service-elements">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
          ></textarea>
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateService;
