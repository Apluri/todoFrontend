import React, { useState, useRef } from "react";

const SearchBar = ({ searchData }) => {
  const [currInput, setCurrInput] = useState("");
  const displayError = useRef(false);

  const renderSearchBar = () => {
    const handleSubmit = (e) => {
      // prevent reload?
      e.preventDefault();
      if (e.target.value.length > 0) {
        if (e.target.value[0] === " ") {
          console.log("gei");
          displayError.current = true;
        } else {
          searchData(e.target.value);
          if (displayError.current) displayError.current = false;
        }
        // setCurrInput("");
      } else {
        // null means fetchAll
        if (displayError.current) displayError.current = false;
        searchData(null);
      }
    };
    return (
      <form onChange={(e) => handleSubmit(e)}>
        <div className="search-button">
          <input
            type="text"
            placeholder="Search"
            value={currInput}
            onChange={(e) => setCurrInput(e.target.value)}
          />
        </div>
      </form>
    );
  };
  return (
    <div className="search-bar">
      {renderSearchBar()}
      {displayError.current && (
        <p className="error-text"> Leading spaces are not allowed! </p>
      )}
    </div>
  );
};
export default SearchBar;
