import { createSlice } from '@reduxjs/toolkit';
import { LeaderboardResponse } from '../../types/leaderboard';

const initialState: {
  leaderboard: LeaderboardResponse;
} = {
  leaderboard: [],
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    updateLeaderboard(state, action) {
      state.leaderboard = action.payload;
    },
  },
});

const { actions, reducer } = leaderboardSlice;

export const { updateLeaderboard } = actions;
export default reducer;
