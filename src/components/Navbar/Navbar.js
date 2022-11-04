import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import "./Navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../logos/logo.jpg";


function Navbar({ showSignInButton, logOut, show }) {
  const {user, loginWithRedirect } = useAuth0();

  const { logout } = useAuth0();
  // const navigate = useNavigate();

  const [dark, setDark] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setDark(true);
    } else {
      setDark(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);

    return () => {
      //cleanup function
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  const goToSignInPage = () => {
    // navigate("/sign-in");
    loginWithRedirect();
  };
  return (
    <div
      className={`navbar_container ${show && "navbar_color"} ${
        dark && "navbar_dark"
      }`}
    >
      <img
        className="navbar_logo"
        src= {logo}
        alt="Logo"
      />
      {/* <Link to="/sign-in">
        <button className="navbar_button">Sign In</button>
      </Link> */}
      {showSignInButton === false ? (
        " "
      ) : (
        <button className="navbar_button" onClick={goToSignInPage}>
          Sign In
        </button>
      )}

      {/* {
        <>
        <label className="Search_box">Search </label>
        <input type="text">Search</input>
        </>
      } */}

      {logOut && ( 
        <>
        <h4 className="user_name"> {user && `Hi ${user.name}`}</h4>
        <p 
        onClick={() => 
        logout({
          returnto: window.location.origin,
        })} className="navbar_icon">
          <AccountCircleIcon />
        </p>
        </>
      )}
    </div>
  );
}

export default Navbar;