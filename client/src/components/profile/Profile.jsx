import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username:
      currentUser.role === "Admin" ? currentUser.name : currentUser.username,
    email: currentUser.email,
    password: currentUser.password,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <h1>Profile</h1>

      <div className="form-wrapper">
        <form>
          <div className="form-element">
            <span>{currentUser.role === "Admin" ? "Name" : "Username"}</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-element">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
