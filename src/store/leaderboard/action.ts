import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLeaderboard } from "../../utils/apis/leaderboard";
import { updateLeaderboard } from "./slice";

export const asyncGetLeaderboard = createAsyncThunk(
  "thread/asyncGetLeaderboard",
  async (_, { dispatch }) => {
    const response = await getLeaderboard();

    if (response.isError) {
      alert(response.message);
    }

    dispatch(updateLeaderboard(response.data.leaderboards));
  },
);
