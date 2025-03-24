import { useState } from "react";
import { capitalizedFirstLetter } from "../../helpers/capitalizeFirstLetter";
import Select from "../ui/Select";

const ThreadsFilter = () => {
  const [sortedBy, setSortedBy] = useState("newest");
  const [filteredBy, setFilteredBy] = useState("all");

  const categories = ["general", "programming", "health"];
  const sortedCategories = [...categories].sort();

  return (
    <div className="mb-3 flex w-full items-center justify-end gap-3 rounded-lg bg-white p-4">
      <div className="flex w-fit items-center gap-2">
        <div className="flex-none">Sorted by: </div>
        <Select value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="highest_votes">Highest votes</option>
        </Select>
      </div>
      <div className="flex w-fit items-center gap-2">
        <div className="flex-none">Filtered by: </div>
        <Select
          value={filteredBy}
          onChange={(e) => setFilteredBy(e.target.value)}
        >
          <option value="all">All categories</option>
          {sortedCategories.map((category) => (
            <option value={category} key={category}>
              {capitalizedFirstLetter(category)}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default ThreadsFilter;
