import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from '../../utils/apis/users';
import { updateUsers } from './slice';
import { openAlert } from '../alert/slice';

export const asyncGetUsers = createAsyncThunk(
  'users/asyncGetUsers',
  async (_, { dispatch }) => {
    const response = await getAllUsers();

    if (response.isError) {
      dispatch(openAlert({ message: response.message }));
    }

    dispatch(updateUsers(response.data));
  },
);
