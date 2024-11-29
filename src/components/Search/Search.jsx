import React from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../PostCard/PostCard";
import Button from "../Button/Button";
import NavButton from "../../uitlity/navButton";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

export default function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const message = query.get("q");
  const postCount = query.get("count") || 0;
  const [searchValue, setSearchValue] = useState(message);
  const [postResult, setPostSearchResult] = useState([]);
  const [afterPostLink, setAfterPostLink] = useState("");
  const [previousPostLink, setPreviousPostLink] = useState("");
  const [dist, setDist] = useState(0);
  const navigate = useNavigate();
  const [lastPressedNavBtn, setLastPressedNavBtn] = useState(NavButton.NONE);

  let fetchFromUrl = (searchText) => {
    fetch(`${BASE_URL}/search.json${searchText}`)
      .then((res) => res.json())
      .then((res) => {
        setAfterPostLink(res.data.after);
        setPreviousPostLink(res.data.before);
        setPostSearchResult(res.data.children);
        setDist(res.data.dist);
      });
  };

  const handleNavigate = () => {
    navigate(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  const handlePrevNavigate = () => {
    let urlCount = "";

    if (lastPressedNavBtn === NavButton.PREV) {
      urlCount = parseInt(postCount) - parseInt(dist);
    } else {
      urlCount = parseInt(postCount) + 1;
    }
    setLastPressedNavBtn(NavButton.PREV);

    navigate(
      encodeURI(
        `/search?q=${searchValue}&count=${urlCount}&before=${afterPostLink}`
      )
    );
  };

  const handleAfterNavigate = () => {
    let urlCount = "";

    if (lastPressedNavBtn === NavButton.PREV) {
      urlCount = parseInt(postCount) - 1;
    } else {
      urlCount = parseInt(postCount) + parseInt(dist);
    }
    setLastPressedNavBtn(NavButton.AFTER);

    navigate(
      encodeURI(
        `/search?q=${searchValue}&count=${urlCount}&after=${afterPostLink}`
      )
    );
  };

  useEffect(() => {
    setSearchValue(message);
    fetchFromUrl(location.search);
    window.scrollTo(0, 0);
  }, [location.search]);

  return (
    <div className=" flex flex-col items-center gap-2 py-2">
      <div className="w-11/12 sm:w-9/12">
        <SearchBox
          searchValue={searchValue}
          onSearchValueChange={(value) => setSearchValue(value)}
          onSearchClick={() => {
            handleNavigate();
          }}
        />
      </div>

      <div className="w-11/12 sm:w-9/12 flex flex-col gap-2">
        {postResult.map((obj) => (
          <PostCard key={obj.data.id} {...obj.data} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className="hover:cursor-pointer"
          onClick={() => handlePrevNavigate()}
        >
          {previousPostLink && <Button text="prev" />}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={() => handleAfterNavigate()}
        >
          {afterPostLink && <Button text="next" />}
        </div>
      </div>
    </div>
  );
}
