import NewThreadForm from "../components/thread/NewThreadForm";
import { NewThreadRequest } from "../types/thread";

const NewThread = () => {
  const submitHander = (data: NewThreadRequest) => {
    console.log(data);
  };

  const categories = ["general", "programming"];
  const sortedCategories = [...categories].sort();

  return (
    <div className="w-full p-4">
      <h1 className="mb-6 text-4xl font-bold">Start new discussion</h1>
      <NewThreadForm categories={sortedCategories} onSubmit={submitHander} />
    </div>
  );
};

export default NewThread;
