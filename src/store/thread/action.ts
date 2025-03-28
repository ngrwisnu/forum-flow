import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllThreads, getThread } from "../../utils/apis/threads";
import { updateThreadDetails, updateThreads } from "./slice";

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

export const asyncGetThreadDetails = createAsyncThunk(
  "thread/asyncGetThreadDetails",
  async (threadId: string, { dispatch }) => {
    const response = await getThread(threadId);

    if (response.isError) {
      alert(response.message);
    }

    dispatch(updateThreadDetails(response.data.detailThread));
  },
);
