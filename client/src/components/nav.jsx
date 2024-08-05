import { Link } from "react-router-dom";
//link for mongodb
//
const Nav = () => {
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
            <li>Sign in</li>
          </Link>
          <Link to="/adminSignup">
            <li>Admin Registration</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
