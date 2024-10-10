import SearchBox from "../SearchBox/SearchBox";

export default function SideSearchBox({
  searchValue,
  onSearchValueChange,
  onSearchClick,
  isChecked,
  handleCheckboxChange,
  subreddit,
}) {
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
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              restrict search in r/{subreddit}
            </label>
          </div>
        )}
      </div>
    </>
  );
}
