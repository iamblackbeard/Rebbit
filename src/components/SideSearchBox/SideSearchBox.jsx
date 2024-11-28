import { useId } from "react";
import SearchBox from "../SearchBox/SearchBox";

export default function SideSearchBox({
  searchValue,
  onSearchValueChange,
  onSearchClick,
  isChecked,
  handleCheckboxChange,
  subreddit,
}) {
  const id = useId();

  return (
    <>
      <div className="flex flex-col gap-4">
        <SearchBox
          searchValue={searchValue}
          onSearchValueChange={onSearchValueChange}
          onSearchClick={onSearchClick}
        />

        {subreddit && (
          <div>
            <label htmlFor={id}>
              <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
              />
              restrict search in r/{subreddit}
            </label>
          </div>
        )}
      </div>
    </>
  );
}
