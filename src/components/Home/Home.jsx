import React from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import rebbit from "../../assets/images/rebbit.png";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  return (
    <div className="  h-full flex flex-col items-center justify-center">
      <div className="flex justify-center items-center">
        <img src={rebbit} alt="Logo" className="w-32 h-32" />
        <div className="text-3xl font-bold text-primary">Rebbit</div>
      </div>

      <div className="w-3/4 md:w-3/6">
        <SearchBox
          searchValue={searchValue}
          onSearchValueChange={(value) => setSearchValue(value)}
          onSearchClick={handleNavigate}
        />
      </div>
    </div>
  );
}
