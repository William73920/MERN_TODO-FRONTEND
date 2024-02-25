import React, { useState } from "react";
import { FcFilledFilter } from "react-icons/fc";
import ClickAwayListener from "react-click-away-listener";
import "./Search.css";

const Search = ({ setSearchText, setAscending }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClickAway = () => {
    setShowMenu(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="search__container">
        <input
          type="text"
          placeholder="Type to search Notes"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <FcFilledFilter
          size={24}
          className="search__filter"
          onClick={() => setShowMenu(true)}
        />
        {showMenu && (
          <div className="search__menu">
            <span
              className="search__filterOptions"
              onClick={() => setAscending(true)}
            >
              Ascending
            </span>
            <span
              className="search__filterOptions"
              onClick={() => setAscending(false)}
            >
              Descending
            </span>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Search;
