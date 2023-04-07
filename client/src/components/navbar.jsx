import React, { useContext, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../App.css";
import { useGetUserID } from "../hooks/useGetUserID";
function getActiveClass(route, location) {
  // console.log({ route });
  switch (location.pathname) {
    case route:
      return "activeTab";
      break;

    default:
      return "tab";
      break;
  }
}
export const Navbar = ({ setTheme, theme }) => {
  const [cookies, setCookies] = useCookies(["access_token"]); //created in auth file
  const navigate = useNavigate();
  const location = useLocation();
  const [showLinks, setShowLinks] = useState(false);
  const userID = useGetUserID();
  const logout = () => {
    setCookies("access_token", ""); //! to logout we r setting cookie empty
    window.localStorage.removeItem("userID"); //! clearing local storage
    navigate("/auth"); //takin them to auth again
  };
  // console.log({ location });
  const handleTheme = () => {
    setTheme((previousTheme) => {
      return previousTheme === "light" ? "dark" : "light";
    });
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
          <NavLink
            data-text="Home"
            className={getActiveClass("/", location)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={getActiveClass("/create-recipe", location)}
            to="/create-recipe"
          >
            Create Recipe
          </NavLink>
          {userID ? (
            <NavLink
              className={getActiveClass("/saved-recipes", location)}
              to="/saved-recipes"
            >
              Saved Recipes
            </NavLink>
          ) : null}
          {!cookies.access_token ? (
            <NavLink className={getActiveClass("/auth", location)} to="/auth">
              {" "}
              Login/register{" "}
            </NavLink>
          ) : (
            <button className="logout" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
      <button onClick={handleTheme} className="themeBtn">
        {theme === "dark" ? "🌞" : "🌛"}
      </button>

      <div className="rightside">{/* //*make a search button in here */}</div>
    </div>
  );
};
