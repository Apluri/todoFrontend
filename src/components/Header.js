// useState to replace need for props usage
import React from "react";
import { NavLink } from "react-router-dom"; // import { Link } from "react-router-dom";

// Navlink vs Link = NavLink enables the usage of activeClassName
// activeClassname for dynamic css styling

const Header = ({ handleNavSizeChange }) => {
  return (
    <div className="header">
      <button className="burger-btn" onClick={() => handleNavSizeChange()}>
        Burg
      </button>
      <h1> Get title here </h1>
    </div>
  );
};
export default Header;

// OLD SOLUTION
// navbar for the application which handles routers linking to different files
// activeClassname for dynamic state based css styling
/*
export const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-header">
        <ul className="navbar-nav">
          <li>
            <NavLink to={"/home"} activeClassName={"active"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/page1"} activeClassName={"active"}>
              Page1
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
*/
