import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllThreads } from "../../utils/apis/threads";
import { updateThreads } from "./slice";

export const asyncGetThreads = createAsyncThunk(
  "thread/asyncGetThreads",
  async (_, { dispatch }) => {
    const response = await getAllThreads();

    if (response.isError) {
      alert(response.message);
    }

    dispatch(updateThreads(response.data.threads));
  },
);
