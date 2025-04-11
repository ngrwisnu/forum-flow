import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewThreadForm from '../components/thread/NewThreadForm';
import { NewThreadRequest } from '../types/thread';
import { AppDispatch, RootState } from '../store';
import { createThread } from '../utils/apis/threads';
import { openAlert } from '../store/alert/slice';

const NewThread = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
    }
  }, [auth.isAuthenticated, navigate]);

  const submitHander = async (data: NewThreadRequest) => {
    const response = await createThread(data);

    if (response.isError) {
      dispatch(openAlert({ message: response.message }));
      return;
    }

    navigate('/');
  };

  const categories = ['general', 'programming'];
  const sortedCategories = [...categories].sort();

  return (
    <div className="w-full p-4">
      <h1 className="mb-6 text-4xl font-bold">Start new discussion</h1>
      <NewThreadForm categories={sortedCategories} onSubmit={submitHander} />
    </div>
  );
};

export default NewThread;
