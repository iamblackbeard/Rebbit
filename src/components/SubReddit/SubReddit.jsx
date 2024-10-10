import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import PostCard from "../PostCard/PostCard";
import NavButton from "../../uitlity/navButton";
import SideSearchBox from "../SideSearchBox/SideSearchBox";
import SubRedditInfo from "../SubRedditInfo/SubRedditInfo";

export default function SubReddit() {
  const location = useLocation();
  const { subreddit } = useParams();
  const query = new URLSearchParams(location.search);
  const postCount = query.get("count") || 0;
  const [postList, setPostList] = useState([]);
  const [afterPostId, setAfterPostId] = useState("");
  const [previousPostId, setPreviousPostId] = useState("");
  const [dist, setDist] = useState(0);
  const navigate = useNavigate();
  const [lastPressedNavBtn, setLastPressedNavBtn] = useState(NavButton.NONE);
  const [searchValue, setSearchValue] = useState(query.get("q") || "");
  const [restrictSearch, setRestrictSearch] = useState(false);
  const [subredditInfo, setSubredditInfo] = useState({});

  function fetchSubredditPosts() {
    let url = `https:old.reddit.com${location.pathname}.json${location.search}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setPostList(res.data.children);
        setPreviousPostId(res.data.before);
        setAfterPostId(res.data.after);
        setDist(res.data.dist);
      })
      .catch((e) => {
        console.log("ERROR : Fetching Subreddit Post : ", e);
      });
  }

  function fetchSubredditInfo() {
    let url = `https:old.reddit.com/r/${subreddit}/about.json`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setSubredditInfo(res.data);
      })
      .catch((e) => {
        console.log("ERROR : Fetching Subreddit Info : ", e);
      });
  }

  const handleAfterBtnNavigation = () => {
    let urlCount = "";

    if (lastPressedNavBtn === NavButton.PREV) {
      urlCount = parseInt(postCount) - 1;
    } else {
      urlCount = parseInt(postCount) + parseInt(dist);
    }
    setLastPressedNavBtn(NavButton.AFTER);

    navigate(
      encodeURI(
        `${location.pathname}?${
          searchValue ? "q=" + searchValue + "&" : ""
        }count=${urlCount}&after=${afterPostId}${
          restrictSearch ? "&restrict_sr=on" : ""
        }`
      )
    );
  };

  const handlePrevBtnNavigation = () => {
    let urlCount = "";

    if (lastPressedNavBtn === NavButton.PREV) {
      urlCount = parseInt(postCount) - parseInt(dist);
    } else {
      urlCount = parseInt(postCount) + 1;
    }
    setLastPressedNavBtn(NavButton.PREV);

    navigate(
      encodeURI(
        `${location.pathname}?${
          searchValue ? "q=" + searchValue + "&" : ""
        }count=${urlCount}&before=${previousPostId}${
          restrictSearch ? "&restrict_sr=on" : ""
        }`
      )
    );
  };

  const handleSearchClick = () => {
    navigate(
      encodeURI(
        `/r/${subreddit}/search?q=${searchValue ? searchValue : ""}${
          restrictSearch ? "&restrict_sr=on" : ""
        }`
      )
    );
  };

  useEffect(() => {
    fetchSubredditPosts();

    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  useEffect(() => {
    fetchSubredditInfo();
  }, [subreddit]);

  return (
    <>
      {/* Add image here */}
      <div className="w-full h-full grid md:grid-cols-12 sm:grid-cols-6  gap-4 p-4 ">
        <div className="border-primary md:col-span-9 sm:col-span-4 flex flex-col gap-4">
          {/* POST LIST */}
          <div className="w-11/12 sm:w-9/12 md:w-2/4 flex flex-col gap-2">
            {postList.map((obj) => (
              <PostCard key={obj.data.id} {...obj.data} />
            ))}
          </div>
          {/* PREV BTN       AFTER BTN */}
          <div className="flex justify-center items-center gap-2">
            <div
              className="hover:cursor-pointer hover:underline"
              onClick={() => handlePrevBtnNavigation()}
            >
              {previousPostId && <Button text="prev" />}
            </div>
            <div
              className="hover:cursor-pointer hover:underline"
              onClick={() => handleAfterBtnNavigation()}
            >
              {afterPostId && <Button text="next" />}
            </div>
          </div>
        </div>
        <div className="border-primary bg-red-500 md:col-span-3 sm:col-span-2 sm:block hidden">
          <SideSearchBox
            searchValue={searchValue}
            onSearchValueChange={(value) => {
              setSearchValue(value);
            }}
            onSearchClick={handleSearchClick}
            isChecked={restrictSearch}
            handleCheckboxChange={(value) => {
              setRestrictSearch(value);
            }}
            subreddit={subreddit}
          />

          <SubRedditInfo {...subredditInfo} />
        </div>
      </div>
    </>
  );
}
