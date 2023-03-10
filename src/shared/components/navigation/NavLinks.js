import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import AuthContext from "../../context/auth-context";
import ProfileButton from "./ProfileButton";

import "./NavLinks.css";

const NavLinks = (props) => {
  const { sideDrawerOpen } = props;
  const context = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {context.isLoggedIn && sideDrawerOpen && (
        <li>
          <ProfileButton className={"profile-image-sidebar"} />
          <p className="center" style={{ fontSize: "15px", margin: 0 }}>
            MY PROFILE
          </p>
        </li>
      )}
      {context.isLoggedIn && (
        <li>
          <NavLink
            exact
            to="/myworkouts"
            activeStyle={{
              color: "white",
              backgroundColor: "#1e90ff",
              borderRadius: "2em",
              textDecoration: "underline white",
            }}
          >
            MY WORKOUTS
          </NavLink>
        </li>
      )}
      {context.isLoggedIn && (
        <li>
          <NavLink
            exact
            to="/workouts/new"
            activeStyle={{
              color: "white",
              backgroundColor: "#1e90ff",
              borderRadius: "2em",
              textDecoration: "underline white",
            }}
          >
            NEW WORKOUT
          </NavLink>
        </li>
      )}
      {!context.isLoggedIn && (
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
      )}
      {context.isLoggedIn && !sideDrawerOpen && (
        <li>
          <ProfileButton className={"profile-image-header"} />
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
