import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//link for mongodb
//
const Nav = () => {
  const { currentUser } = useSelector((state) => state.user);

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
            ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
