import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function Button({ link, text, icon }) {
  const nextButton = () => {
    if (text === "next") {
      return <GrFormNext />;
    }
  };

  const previousButton = () => {
    if (text === "prev") {
      return <GrFormPrevious />;
    }
  };

  return (
    <div className="border border-primary bg-off-white rounded-md px-2  flex gap-1 items-center justify-center">
      {previousButton()}
      <div>{text}</div>
      {nextButton()}
    </div>
  );
}
