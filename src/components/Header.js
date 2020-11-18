// useState to replace need for props usage
import React from "react";
import TitleComponent from "./TitleComponent";

// Navlink vs Link = NavLink enables the usage of activeClassName
// activeClassname for dynamic css styling

const Header = ({ handleNavSizeChange }) => {
  return (
    <div className="header">
      <button className="burger-btn" onClick={() => handleNavSizeChange()}>
        Burg
      </button>
      <TitleComponent />
    </div>
  );
};
export default Header;
