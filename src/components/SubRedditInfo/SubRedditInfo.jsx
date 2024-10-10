import ReactMarkdown from "react-markdown";

export default function SubRedditInfo({
  display_name,
  title,
  icon_img,
  display_name_prefixed,
  subscribers,
  public_description,
  banner_img,
  mobile_banner_img,
  created_utc,
  description,
}) {
  return (
    <>
    <div className="font-bold text-xl">{display_name}</div>
      <ReactMarkdown>{public_description}</ReactMarkdown>
    <div className="font-bold text-lg">About</div> 
      <ReactMarkdown>{description}</ReactMarkdown>
    </>
  );
}
