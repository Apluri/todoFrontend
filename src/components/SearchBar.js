import React, { useState } from "react";

const SearchBar = ({ searchData }) => {
  const [currInput, setCurrInput] = useState("");

  const renderSearchBar = () => {
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
      <form onSubmit={(e) => handleSubmit(e)}>
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
  return <div className="search-bar">{renderSearchBar()}</div>;
};
export default SearchBar;
