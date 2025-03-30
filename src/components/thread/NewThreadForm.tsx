import { ChangeEvent, useState } from 'react';
import { capitalizedFirstLetter } from '../../helpers/capitalizeFirstLetter';
import Button from '../ui/Button';
import Editor from '../ui/Editor';
import { FormItem } from '../ui/Form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { NewThreadRequest } from '../../types/thread';

interface NewThreadFormProps {
  categories: string[];
  onSubmit: (data: NewThreadRequest) => void;
}

const NewThreadForm = ({ categories, onSubmit }: NewThreadFormProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const editorBlurHandler = (e: ChangeEvent<HTMLDivElement>) => {
    setBody(e.target.innerHTML);
  };

  return (
    <form className="flex flex-col gap-4">
      <FormItem>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          name="title"
          type="text"
          value={title}
          className="input-ghost border border-slate-200"
          placeholder="Enter the title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormItem>
      <FormItem>
        <label htmlFor="category">Category</label>
        <Select
          id="category"
          className="select-ghost border border-slate-200"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled selected>
            Select the category
          </option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {capitalizedFirstLetter(category)}
            </option>
          ))}
        </Select>
      </FormItem>
      <FormItem>
        <label htmlFor="body">Body</label>
        <Editor editorHandler={editorBlurHandler} />
      </FormItem>
      <div className="flex justify-end">
        <Button
          type="button"
          className="btn-secondary ml-auto"
          onClick={() => onSubmit({
            title,
            category,
            body,
          })
          }
        >
          Post thread
        </Button>
      </div>
    </form>
  );
};

export default NewThreadForm;
