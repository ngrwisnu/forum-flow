import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  downVoteThread,
  getAllThreads,
  getThread,
  upVoteThread,
} from "../../utils/apis/threads";
import {
  abortCommentVote,
  abortThreadVote,
  updateDownVote,
  updateDownVoteComment,
  updateThreadDetails,
  updateThreads,
  updateUpVote,
  updateUpVoteComment,
} from "./slice";
import { downVoteComment, upVoteComment } from "../../utils/apis/comment";

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
    dispatch(updateUpVote(userId));

    const response = await upVoteThread(threadId);

    if (response.isError) {
      alert(response.message);

      dispatch(abortThreadVote({ type: "up-vote", userId }));
    }
  },
);

export const asyncDownVoteThread = createAsyncThunk(
  "thread/asyncDownVoteThread",
  async (
    { threadId, userId }: { threadId: string; userId: string },
    { dispatch },
  ) => {
    dispatch(updateDownVote(userId));

    const response = await downVoteThread(threadId);

    if (response.isError) {
      alert(response.message);

      dispatch(abortThreadVote({ type: "down-vote", userId }));
    }
  },
);

export const asyncUpVoteComment = createAsyncThunk(
  "thread/asyncUpVoteComment",
  async (
    {
      threadId,
      commentId,
      userId,
    }: { threadId: string; commentId: string; userId: string },
    { dispatch },
  ) => {
    dispatch(updateUpVoteComment({ commentId, userId }));

    const response = await upVoteComment(threadId, commentId);

    if (response.isError) {
      alert(response.message);

      dispatch(abortCommentVote({ type: "up-vote", commentId, userId }));
    }
  },
);

export const asyncDownVoteComment = createAsyncThunk(
  "thread/asyncDownVoteComment",
  async (
    {
      threadId,
      commentId,
      userId,
    }: { threadId: string; commentId: string; userId: string },
    { dispatch },
  ) => {
    dispatch(updateDownVoteComment({ commentId, userId }));

    const response = await downVoteComment(threadId, commentId);

    if (response.isError) {
      alert(response.message);

      dispatch(abortCommentVote({ type: "down-vote", commentId, userId }));
    }
  },
);
