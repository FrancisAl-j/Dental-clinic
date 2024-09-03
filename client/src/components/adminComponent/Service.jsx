import axios from "axios";
import { useState } from "react";

const Service = () => {
  const [addFeatures, setAddFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFeatureChange = (e) => {
    setNewFeature(e.target.value);
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (newFeature.trim()) {
      setAddFeatures([...addFeatures, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = addFeatures.filter((_, i) => i !== index);
    setAddFeatures(updatedFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, category } = formData;
    const features = addFeatures;
    try {
      const res = await axios.post(
        "http://localhost:5000/service/create",
        {
          name,
          description,
          category,
          features,
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
      <form onSubmit={handleSubmit}>
        <div className="form-elements">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          ></textarea>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="features-wrapper">
          <input
            type="text"
            value={newFeature}
            onChange={handleFeatureChange}
            placeholder="Add Features"
          />
          <button onClick={handleAddFeature}>Add Feature</button>
          {addFeatures.map((feature, index) => {
            return (
              <div className="feature-container" key={index}>
                <p>{feature}</p>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Service;
