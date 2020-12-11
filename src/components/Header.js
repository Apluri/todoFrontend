// useState to replace need for props usage
import React, { useState } from "react";
import TitleComponent from "./TitleComponent";

const Header = ({ searchData }) => {
  const [currInput, setCurrInput] = useState("");
  const handleSubmit = (e) => {
    // prevent reload?
    e.preventDefault();
    if (currInput.length > 0) {
      searchData(currInput);
      setCurrInput("");
    } else {
      // null means fetchAll
      searchData(null);
    }
  };
  return (
    <div className="header">
      <TitleComponent />
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="title, description, deadline"
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
        />
        <button>Search</button>
      </form>
    </div>
  );
};
export default Header;
