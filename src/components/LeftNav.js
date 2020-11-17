// useState to replace need for props usage
import React, { useState, useEffect } from "react";

const LeftNav = ({ navSize, handleNavSizeChange }) => {
  return (
    <div className="left-sidebar" style={{ width: navSize }}>
      <button className="burger-btn" onClick={() => handleNavSizeChange()}>
        Burg
      </button>
      <div>
        <ul>
          <li>contsaa</li>
          <li>contsaa</li>
          <li>contsaa</li>
          <li>contsaa</li>
        </ul>
      </div>
    </div>
  );
};

export default LeftNav;
