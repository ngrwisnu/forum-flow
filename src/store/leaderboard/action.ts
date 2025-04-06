import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getLeaderboard } from '../../utils/apis/leaderboard';
import { updateLeaderboard } from './slice';

export const asyncGetLeaderboard = createAsyncThunk(
  'thread/asyncGetLeaderboard',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    const response = await getLeaderboard();

    if (response.isError) {
      alert(response.message);
    } else {
      dispatch(updateLeaderboard(response.data.leaderboards));
    }

    dispatch(hideLoading());
  },
);
