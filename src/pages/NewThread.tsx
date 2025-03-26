import { FormItem } from "../components/form/Form";
import Button from "../components/ui/Button";
import Editor from "../components/ui/Editor";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { capitalizedFirstLetter } from "../helpers/capitalizeFirstLetter";

const NewThread = () => {
  const categories = ["general", "programming"];
  const sortedCategories = [...categories].sort();

  return (
    <div className="w-full p-4">
      <h1 className="mb-6 text-4xl font-bold">Start new discussion</h1>
      <form className="flex flex-col gap-4">
        <FormItem>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            name="title"
            type="text"
            className="input-ghost border border-slate-200"
            placeholder="Enter the title"
          />
        </FormItem>
        <FormItem>
          <label htmlFor="category">Category</label>
          <Select
            id="category"
            className="select-ghost border border-slate-200"
            name="category"
          >
            <option disabled selected>
              Select the category
            </option>
            {sortedCategories.map((category) => (
              <option value={category} key={category}>
                {capitalizedFirstLetter(category)}
              </option>
            ))}
          </Select>
        </FormItem>
        <FormItem>
          <label htmlFor="body">Body</label>
          <Editor />
        </FormItem>
        <div className="flex justify-end">
          <Button className="btn-secondary ml-auto">Post thread</Button>
        </div>
      </form>
    </div>
  );
};

export default NewThread;
