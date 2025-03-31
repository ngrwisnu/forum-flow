import { ChangeEvent } from 'react';
import Select from '../ui/Select';

interface CommentFilterProps {
  value: string;
  sorterHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const CommentFilter = ({ value, sorterHandler }: CommentFilterProps) => (
  <div className="flex w-fit items-center gap-2">
    <div className="flex-none">Sorted by: </div>
    <Select name="sort" value={value} onChange={sorterHandler}>
      <option value="newest">Newest</option>
      <option value="highest_votes">Highest votes</option>
    </Select>
  </div>
);

export default CommentFilter;
