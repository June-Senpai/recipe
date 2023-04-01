import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../App.css";
import { useGetUserID } from "../hooks/useGetUserID";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]); //created in auth file
  const navigate = useNavigate();
  const location = useLocation();
  const [showLinks, setShowLinks] = useState(false);
  const userID = useGetUserID();
  const logout = () => {
    setCookies("access_token", ""); //! to logout we r settin cookie empty
    window.localStorage.removeItem("userID"); //! clearing local storage
    navigate("/auth"); //takin them to auth again
  };

  return (
    <div className="navbar">
      <div className="leftside">
        <button className="sidebutton" onClick={() => setShowLinks(!showLinks)}>
          {showLinks ? (
            <img
              src="https://cdn1.iconfinder.com/data/icons/blobby-iconset/100/Close_with_circle-512.png"
              alt="menu icon"
              width={70}
            />
          ) : (
            <img
              src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/30-512.png"
              alt="menu icon"
              width={70}
            />
          )}
        </button>
        <div className="link-container" id={showLinks ? "hidden" : ""}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create-recipe">Create Recipe</NavLink>
          {userID ? <NavLink to="/saved-recipes">Saved Recipes</NavLink> : null}
          {!cookies.access_token ? (
            <NavLink to="/auth"> Login/register </NavLink>
          ) : (
            <button className="logout" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="rightside">{/* //*make a search button in here */}</div>
    </div>
  );
};
