import { useSelector } from "react-redux";
import NewThreadForm from "../components/thread/NewThreadForm";
import { NewThreadRequest } from "../types/thread";
import { RootState } from "../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createThread } from "../utils/apis/threads";

const NewThread = () => {
  const { auth } = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate]);

  const submitHander = async (data: NewThreadRequest) => {
    const response = await createThread(data);

    if (response.isError) {
      alert(response.message);
    }

    navigate("/");
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
