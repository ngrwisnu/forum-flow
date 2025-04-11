import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Alert from '../ui/Alert';
import { AppDispatch, RootState } from '../../store';
import { closeAlert } from '../../store/alert/slice';

const AppLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { alert } = useSelector((state: RootState) => state);

  useEffect(() => {
    // close the alert automatically
    if (alert.isOpen) {
      setTimeout(() => {
        dispatch(closeAlert());
      }, 5000);
    }
  }, [dispatch, alert.isOpen]);

  const closeHandler = () => {
    dispatch(closeAlert());
  };

  return (
    <>
      <Alert {...alert} clickHandler={closeHandler} />
      <Outlet />
    </>
  );
};

export default AppLayout;
