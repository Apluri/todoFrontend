// useState to replace need for props usage
import React from "react";
import { NavLink } from "react-router-dom"; // import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";

import { useHistory } from "react-router-dom";

const LeftNav = ({ navSize, handleNavSizeChange, closeNav }) => {
  let history = useHistory();
  let wrapperFunction = () => {
    closeNav();
    history.push("/add");
  };
  return (
    <div>
      <div className="left-sidebar" style={{ width: navSize }}>
        <nav className="navbar">
          <NavLink
            exact
            to={"/"}
            className="navlink"
            activeClassName={"active"}
          >
            <Icon className="fa fa-home" />
            Tasks
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
      <div className="add-btn">
        <Icon className="fa fa-plus-square" onClick={() => wrapperFunction()} />
      </div>
    </div>
  );
};

export default LeftNav;
