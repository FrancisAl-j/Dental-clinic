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

const UpdateService = ({ setShow, service }) => {
  const [imageLogo, setImageLogo] = useState(undefined);
  const [bgImage, setBgImage] = useState(undefined);
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    imageLogo: service.imageLogo,
    bgImage: service.bgImage,
  });

  const imageLogoRef = useRef();

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="update-service-container">
      <form>
        <div className="form-header">
          <h1>Update Service</h1>
          <img onClick={() => setShow(false)} src={Close} alt="close" />
        </div>
        <div className="image-logo-container">
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
          <img src={formData.bgImage} alt="" />
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
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default UpdateService;
