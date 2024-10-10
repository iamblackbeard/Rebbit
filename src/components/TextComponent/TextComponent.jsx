import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

function TextComponent({ text = "", initialLines = 3 }) {
  const [showMore, setShowMore] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false); // State to track if the text is truncated

  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const totalHeight = textRef.current.scrollHeight;
      const visibleHeight = textRef.current.clientHeight;
      setIsTruncated(totalHeight > visibleHeight);
    }
  }, [text]);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <div
        ref={textRef}
        className={showMore ? "" : `line-clamp-${initialLines}`}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>

      {isTruncated && (
        <button
          onClick={handleToggle}
          className="mt-2 text-blue-500 hover:cursor-pointer"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default TextComponent;
