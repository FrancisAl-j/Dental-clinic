import { useState } from "react";
import "./updateService.css";
import Close from "../../../assets/close.svg";

const UpdateService = ({ setShow, service }) => {
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div>
      <form>
        <div className="form-header">
          <h1>Update Service</h1>
          <img onClick={() => setShow(false)} src={Close} alt="close" />
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
