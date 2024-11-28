import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaRegCommentAlt, FaChevronDown } from "react-icons/fa";
import Comment from "../Comment/Comment";
import TextComponent from "../TextComponent/TextComponent";
import { timeAgo } from "../../uitlity/timeAgo";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import subreddit_image from "../../assets/images/subreddit_image.svg";
import SideSearchBox from "../SideSearchBox/SideSearchBox";
import SubRedditInfo from "../SubRedditInfo/SubRedditInfo";

export default function PostDetail() {
  const { subreddit, postId, postTitle, commentId } = useParams(); // New Change
  const location = useLocation();
  const [permalink, setPermalink] = useState("");
  const [postInfo, setPostInfo] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [parentId, setParentId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [restrictSearch, setRestrictSearch] = useState(false);
  const navigate = useNavigate();
  const [subredditInfo, setSubredditInfo] = useState({});

  const handleSearchClick = () => {
    navigate(
      encodeURI(
        `/r/${subreddit}/search?q=${searchValue ? searchValue : ""}${
          restrictSearch ? "&restrict_sr=on" : ""
        }`
      )
    );
  };

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

  function fetchData() {
    let url = `https://old.reddit.com${location.pathname}/.json`;

    fetch(url)
      .then((res) => {
        console.log(typeof res);
        return res.json();
      })
      .then((apiResponse) => {
        setPostInfo(apiResponse[0].data.children[0].data);
        setAllComments(apiResponse[1].data.children);
        setPermalink(apiResponse[0].data.children[0].data.permalink);
        setParentId(
          apiResponse[1]?.data.children[0].data.parent_id?.split("_")[1]
        );
      });
  }

  useEffect(() => {
    if (subreddit) {
      fetchSubredditInfo();
    }
  }, [subreddit]);

  useEffect(() => {
    console.log("Fetching Data Of Post");
    fetchData();
  }, [commentId]);

  const [visibleComments, setVisibleComments] = useState([]);

  const [visibleCommentsCount, setVisibleCommentsCount] = useState(10);

  const showMore = () => {
    setVisibleCommentsCount((prevCount) => prevCount + 5);
  };

  useEffect(() => {
    setVisibleComments(allComments.slice(0, visibleCommentsCount));

    console.log("visible comments length ", visibleComments.length);
  }, [allComments, visibleCommentsCount]);

  return (
    <div className="w-full h-full grid md:grid-cols-12 sm:grid-cols-6  gap-4 p-4 ">
      <div className="border-primary md:col-span-9 sm:col-span-4 flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="w-12 h-12 rounded-full   bg-black">
            <img
              src={subreddit_image}
              alt=""
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div>
            <div className="flex gap-2">
              <Link
                to={`/r/${subreddit}`}
                className="hover:underline hover:cursor-pointer"
              >
                r/{subreddit}{" "}
              </Link>
              <span>•</span>
              <div> {timeAgo(postInfo.created_utc)}</div>
            </div>
            <div>u/{postInfo.author}</div>
          </div>
        </div>

        <div>
          <div className="font-bold text-xl">{postInfo.title}</div>
          <TextComponent text={postInfo.selftext} />

          <div className="flex gap-4">
            <div className="bg-primary text-white rounded-full flex gap-2 p-2 justify-center items-center">
              <BiUpvote />
              {postInfo.ups}
              <BiDownvote />
            </div>
            <div className="bg-primary text-white rounded-full flex gap-2 p-2 justify-center items-center">
              <FaRegCommentAlt />
              {postInfo.num_comments}
            </div>
          </div>
          {commentId ? (
            <div className="flex justify-between ">
              {parentId !== postId ? (
                <Link
                  to={`/r/${subreddit}/comments/${postId}/comment/${parentId}`}
                >
                  <div className="hover:underline">show parent comment</div>
                </Link>
              ) : (
                <div className="text-red-500 ">show parent comment</div>
              )}

              <Link to={permalink}>
                <div className="hover:underline hover:cursor-pointer">
                  show all comment
                </div>
              </Link>
            </div>
          ) : (
            <div>Comments</div>
          )}

          <div className="flex flex-col gap-8">
            {visibleComments.map((comment) => (
              <Comment key={comment.data.id} {...comment.data} />
            ))}
            <div className="hover:cursor-pointer">
              {visibleCommentsCount < allComments.length && (
                <button
                  onClick={showMore}
                  className="bg-primary text-white px-4 py-2 rounded-full flex justify-center items-center gap-2"
                >
                  Show More
                  <FaChevronDown />
                </button>
              )}
            </div>
          </div>
          <div className="border-primary py-4 md:col-span-3 md:hidden block">
            <SideSearchBox
              searchValue={searchValue}
              onSearchValueChange={(value) => {
                setSearchValue(value);
              }}
              onSearchClick={handleSearchClick}
              isChecked={restrictSearch}
              handleCheckboxChange={(value) => {
                setRestrictSearch(!restrictSearch);
                console.log("Handle check box : ", value)
              }}
              subreddit={subreddit}
            />
          </div>
        </div>
      </div>
      {/* Side Bar - Search and Subreddit info */}
      <div className="border-primary px-4 md:col-span-3 sm:col-span-2 md:block hidden">
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
  );
}
