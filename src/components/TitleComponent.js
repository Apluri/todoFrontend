import React from "react";
import { useLocation } from "react-router-dom";

const TitleComponent = () => {
  const url = useLocation();

  const getTitle = () => {
    switch (url.pathname) {
      case "/":
        return "Tasks";
      case "/folders":
        return "Folders";
      case "/settings":
        return "Settings";
      case "/add":
        return "New task";
      case "/task":
        return "Task";
      default:
        return "Something went wrong :>";
    }
  };

  return <h1>{getTitle()}</h1>;
};

export default TitleComponent;
