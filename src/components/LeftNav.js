// useState to replace need for props usage
import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // import { Link } from "react-router-dom";

const LeftNav = ({ navSize, handleNavSizeChange }) => {
  //test
  let blurring;
  //for enabling dynamic blurring on mobile screen only
  navSize === "100%" ? (blurring = true) : (blurring = false);
  console.log(blurring);
  //<div className={navSize === "100%" ? "one" : "two"}>
  return (
    <div>
      <div className="left-sidebar" style={{ width: navSize }}>
        <nav className="navbar">
          <NavLink
            to={"/home"}
            className="navlink-home"
            activeClassName={"active"}
          >
            Home
          </NavLink>
          <NavLink
            to={"/folders"}
            className="navlink"
            activeClassName={"active"}
          >
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
      <button className="burger-btn" onClick={() => handleNavSizeChange()}>
        Burg
      </button>
    </div>
  );
};

export default LeftNav;
