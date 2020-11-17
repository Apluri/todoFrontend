// useState to replace need for props usage
import React from "react";
import { NavLink } from "react-router-dom"; // import { Link } from "react-router-dom";

const LeftNav = ({ navSize, handleNavSizeChange }) => {
  return (
    <div className="left-sidebar" style={{ width: navSize }}>
      <button className="burger-btn" onClick={() => handleNavSizeChange()}>
        Burg
      </button>
      <nav className="navbar">
        <NavLink
          to={"/home"}
          className="navlink-home"
          activeClassName={"active"}
        >
          Home
        </NavLink>
        <NavLink to={"/folders"} className="navlink" activeClassName={"active"}>
          Folders
        </NavLink>
        <NavLink
          to={"/settings"}
          className="navlink"
          activeClassName={"active"}
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default LeftNav;
