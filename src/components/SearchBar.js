import React, { useState } from "react";
import { Icon } from "@material-ui/core";

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

          <button type="submit">
            <Icon className="fa fa-search"></Icon>
          </button>
        </div>
      </form>
    );
  };
  return <div className="search-bar">{renderSearchBar()}</div>;
};
export default SearchBar;
