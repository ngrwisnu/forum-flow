import { useSelector } from "react-redux";
import NewThreadForm from "../components/thread/NewThreadForm";
import { NewThreadRequest } from "../types/thread";
import { RootState } from "../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewThread = () => {
  const { auth } = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate]);

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
