import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function  ({ searchValue, onSearchValueChange, onSearchClick }) {

  const handleInputChange = (e) => {
    onSearchValueChange(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <div
      className={`flex items-center justify-center p-4 border-2	border-primary rounded-lg w-full`}
    >
      <input
        type="text"
        className={`outline-none w-full py-1 px-3`}
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button onClick={onSearchClick}>
        <BsSearch />
      </button>
    </div>
  );
}
