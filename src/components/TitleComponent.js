import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const TitleComponent = () => {
  const [title, setTitle] = useState("Default smths wrong here");
  const url = useLocation();

  switch (url.pathname) {
    case "/home":
      if (title !== "Home") setTitle("Home");
      break;
    case "/folders":
      if (title !== "Folders") setTitle("Folders");
      break;
    case "/settings":
      if (title !== "Settings") setTitle("Settings");
      break;
    default:
      if (title !== "Default") setTitle("Default"); // this should not be shown
  }
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default TitleComponent;
