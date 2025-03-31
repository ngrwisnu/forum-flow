import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { capitalizedFirstLetter } from '../../helpers/capitalizeFirstLetter';
import Select from '../ui/Select';

const ThreadsFilter = ({ categories }: { categories: string[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortedCategories = [...categories].sort();

  const sortedBy = searchParams.get('sort') || 'newest';
  const selectedCategory = searchParams.get('category') || 'all';

  const filterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    const newParams = new URLSearchParams(searchParams);
    newParams.set(name, value);

    setSearchParams(newParams);
  };

  return (
    <div className="@container mb-3 rounded-lg bg-white p-4">
      <div className="flex w-full flex-col items-start justify-end gap-3 @md:flex-row @md:items-center">
        <div className="flex w-fit items-center gap-2">
          <div className="flex-none">Sorted by: </div>
          <Select name="sort" value={sortedBy} onChange={filterHandler}>
            <option value="newest">Newest</option>
            <option value="highest_votes">Highest votes</option>
          </Select>
        </div>
        <div className="flex w-fit items-center gap-2">
          <div className="flex-none">Filtered by: </div>
          <Select
            name="category"
            value={selectedCategory}
            onChange={filterHandler}
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
    </div>
  );
};

export default ThreadsFilter;
