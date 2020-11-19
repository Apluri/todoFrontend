// useState to replace need for props usage
import React from "react";
import TitleComponent from "./TitleComponent";

// Navlink vs Link = NavLink enables the usage of activeClassName
// activeClassname for dynamic css styling

const Header = ({ handleNavSizeChange }) => {
  return (
    <div className="header">
      <TitleComponent />
    </div>
  );
};
export default Header;
