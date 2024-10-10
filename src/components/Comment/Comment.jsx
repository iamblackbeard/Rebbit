import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { timeAgo } from "../../uitlity/timeAgo";

import user_image from "../../assets/images/user_image.svg";

export default function Comment({
  id,
  name,
  author,
  subreddit_name_prefixed,
  subreddit,
  depth,
  body,
  replies,
  ups,
  parent_id,
  link_id,
  created_utc,
}) {
  let visibleComments = [];

  const linkId = link_id?.split("_")[1];

  const [showReplies, setShowReplies] = useState(true);

  if (replies) {
    visibleComments = replies.data.children.map((reply) => (
      <Comment key={reply.data.id} {...reply.data} />
    ));
  }

  const switchRepliesVisibility = () => {
    setShowReplies(!showReplies);
  };

  return (
    <>
      {author ? (
        <div className="pt-4 pl-4 border-l-2 border-gray-300">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-black  rounded-full">
              <img src={user_image} alt="" className="w-8 h-8 rounded-full" />
            </div>
            <div>
              <div className="flex gap-2">
                <div className="font-medium">u/{author} </div>
                <span>•</span>
                <div> {timeAgo(created_utc)}</div>
              </div>
            </div>
          </div>

          <ReactMarkdown>{body}</ReactMarkdown>

          <div className="flex items-center gap-2 hover:cursor-pointer text-gray-500">
            {replies && depth < 2 && (
              <div onClick={switchRepliesVisibility}>
                {showReplies ? <CiCircleMinus /> : <CiCirclePlus />}
              </div>
            )}

            <div className="bg-primary text-white rounded-full flex gap-2 p-2 justify-center items-center">
              <BiUpvote />
              {ups}
              <BiDownvote />
            </div>
          </div>
          {/* Replies */}

          {replies && showReplies && (
            <div className=" ">
              {depth < 2 ? (
                <div> 
                  {visibleComments}

                </div>
              ) : (
                <Link to={`/r/${subreddit}/comments/${linkId}/comment/${id}`}>
                  <div className="flex gap-2 text-gray-500 items-center hover:underline hover:cursor-pointer ">
                    <CiCirclePlus />
                    show more
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
