import React, { useId } from "react";
import { BsSearch } from "react-icons/bs";

export default function InputBox({
  searchValue,
  onSearchValueChange,
  onSearchClick,
}) {
  return (
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
        type="text"
        value={searchValue}
        className="outline-none w-full py-1 px-3"
        placeholder="Search..."
        onChange={(e) => onSearchValueChange(e.target.value)}
      />
      <button
        onClick={onSearchClick}
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
      >
        <BsSearch />
      </button>
    </div>
  );
}
