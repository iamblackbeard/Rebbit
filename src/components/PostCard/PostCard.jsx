import { Link } from "react-router-dom";
import { formatNumber } from "../../uitlity/formatNumber";
import { timeAgo } from "../../uitlity/timeAgo";

export default function PostCard({
  ups,
  title,
  selfText,
  created_utc,
  subreddit,
  subreddit_name_prefixed,
  author,
  comments,
  permalink,
}) {
  return (
    <div
      className=" bg-off-white border border-2 border-primary p-4 rounded-lg shadow grid grid-cols-12 gap-2"
      // className=" bg-off-white border border-2 border-primary p-4 rounded-lg shadow flex  gap-2"
    >
      <div className="text-primary col-span-1">{formatNumber(ups)}</div>
      <div className="flex flex-col  gap-3 col-span-9">
        <div className=" flex gap-2">
          <Link to={`/r/${subreddit}`} className="font-bold hover:underline">
            r/{subreddit}
          </Link>
          <span>•</span>
          <div>u/{author}</div>
          <span>•</span>
          <div>{timeAgo(created_utc)}</div>
        </div>
        <Link to={permalink} className=" hover:underline text-md font-medium ">
          {title}
        </Link>
        <p className="text-wrap break-words overflow-hidden overflow-ellipsis  line-clamp-3	">
          {selfText}
        </p>
        <div>
          <Link to={permalink} className=" text-gray-400 hover:underline ">
            {formatNumber(comments)} comments
          </Link>
        </div>
      </div>
      <div className=" bg-gray-400 aspect-w-1 aspect-h-1 rounded-md col-span-2"></div>
    </div>
  );
}
