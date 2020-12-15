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
        <input
          type="text"
          placeholder="type here to search"
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
        />
        <button type="submit">S</button>
      </form>
    );
  };
  return <div className="search-bar">{renderSearchBar()}</div>;
};
export default SearchBar;
