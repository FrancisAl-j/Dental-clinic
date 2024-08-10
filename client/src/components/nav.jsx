import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearClinic } from "../redux/clinic/clinicReducer.js";
import { signout } from "../redux/user/userSlice.js";

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
          <Link to="/signin">
            {currentUser ? <p>{currentUser.username}</p> : <li>Sign in</li>}
          </Link>
          <Link to="/adminSignup">
            <li>Admin Registration</li>
          </Link>

          {currentUser &&
            ((
              <Link to="/create-clinic">
                <li>Create Clinic</li>
              </Link>
            ),
            (
              <Link to="Clinic">
                <li>Clinic</li>
              </Link>
            ),
            (<span onClick={handleSignout}>Sign out</span>))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
