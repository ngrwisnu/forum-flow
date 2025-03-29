import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLeaderboard } from "../../utils/apis/leaderboard";
import { updateLeaderboard } from "./slice";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export const asyncGetLeaderboard = createAsyncThunk(
  "thread/asyncGetLeaderboard",
  async (_, { dispatch }) => {
    dispatch(showLoading());
    const response = await getLeaderboard();

    if (response.isError) {
      alert(response.message);
    }

    dispatch(updateLeaderboard(response.data.leaderboards));
    dispatch(hideLoading());
  },
);
