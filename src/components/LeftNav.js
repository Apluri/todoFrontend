// useState to replace need for props usage
import React from "react";
import { NavLink } from "react-router-dom"; // import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";

const LeftNav = ({ navSize, handleNavSizeChange }) => {
  return (
    <div>
      <div className="left-sidebar" style={{ width: navSize }}>
        <nav className="navbar">
          <NavLink
            exact
            to={"/"}
            className="navlink-home"
            activeClassName={"active"}
          >
            <Icon className="fa fa-home" />
            Home
          </NavLink>
          <NavLink
            to={"/folders"}
            className="navlink"
            activeClassName={"active"}
          >
            <Icon className="fa fa-folder-open" />
            Folders
          </NavLink>
          <NavLink
            to={"/settings"}
            className="navlink"
            activeClassName={"active"}
          >
            <Icon className="fa fa-cog" />
            Settings
          </NavLink>
        </nav>
      </div>
      <div className="burger-btn">
        <Icon className="fa fa-bars" onClick={() => handleNavSizeChange()} />
      </div>
    </div>
  );
};

export default LeftNav;
