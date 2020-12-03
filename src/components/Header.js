// useState to replace need for props usage
import React from "react";
import TitleComponent from "./TitleComponent";

const Header = () => {
  return (
    <div className="header">
      <TitleComponent />
    </div>
  );
};
export default Header;
