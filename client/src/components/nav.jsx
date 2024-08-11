import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearClinic } from "../redux/clinic/clinicReducer.js";
import { signout } from "../redux/user/userSlice.js";

import Login from "../assets/logout.svg";
import Signup from "../assets/register.svg";
import { current } from "@reduxjs/toolkit";

const Nav = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/admin/signout", {
        withCredentials: true,
      });
      dispatch(signout());
      dispatch(clearClinic());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <nav>
        <h1>Teeth-T</h1>

        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          {currentUser &&
            ((
              <Link to="Clinic">
                <li>Clinic</li>
              </Link>
            ),
            (<span onClick={handleSignout}>Sign out</span>))}
        </ul>

        <div className="sign-container">
          {currentUser ? (
            <h1>{currentUser.username}</h1>
          ) : (
            <div className="icon-container">
              <Link to="/signin">
                <img src={Login} alt="" />
              </Link>

              <Link to="/adminSignup">
                <img src={Signup} alt="" />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
