import React from "react";
import "./footer.css";
import Facebook from "../../assets/facebook.png";
import Instagram from "../../assets/instagram.png";
import Twitter from "../../assets/twitter.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <footer>
      <section>
        <h2>Dental-Suite</h2>
        <div className="section-btns">
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>

            <Link to="/about">
              <li>About</li>
            </Link>
            {currentUser ? (
              <></>
            ) : (
              <>
                <li>Sign up</li>
                <li>Sign in</li>
              </>
            )}
          </ul>
        </div>
      </section>
      <hr />
      <section>
        <h2>Follow us</h2>
        <div className="footer-icons">
          <img src={Facebook} alt="" className="fb" />
          <img src={Instagram} alt="" className="ig" />
          <img src={Twitter} alt="" className="twitter" />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
