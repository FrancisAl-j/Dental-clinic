import { Link } from "react-router-dom";
//link for mongodb
//mongodb+srv://kiko:kiko@mern.6o5tl1w.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=mern
const Nav = () => {
  return (
    <header>
      <nav>
        <h1>Teeth-T</h1>

        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to={Math.random().toString(29) + "/about"}>
            <li>About</li>
          </Link>
          <Link to="/signin">
            <li>Sign in</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
