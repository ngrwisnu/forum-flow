import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  downVoteThread,
  getAllThreads,
  getThread,
  upVoteThread,
} from "../../utils/apis/threads";
import {
  updateDownVote,
  updateThreadDetails,
  updateThreads,
  updateUpVote,
} from "./slice";

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

export const asyncUpVoteThread = createAsyncThunk(
  "thread/asyncUpVoteThread",
  async (
    { threadId, userId }: { threadId: string; userId: string },
    { dispatch },
  ) => {
    const response = await upVoteThread(threadId);

    if (response.isError) {
      alert(response.message);
    }

    dispatch(updateUpVote(userId));
  },
);

export const asyncDownVoteThread = createAsyncThunk(
  "thread/asyncDownVoteThread",
  async (
    { threadId, userId }: { threadId: string; userId: string },
    { dispatch },
  ) => {
    const response = await downVoteThread(threadId);

    if (response.isError) {
      alert(response.message);
    }

    dispatch(updateDownVote(userId));
  },
);
