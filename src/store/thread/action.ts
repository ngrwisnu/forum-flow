import { createAsyncThunk } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  downVoteThread,
  getAllThreads,
  getThread,
  upVoteThread,
} from '../../utils/apis/threads';
import {
  abortCommentVote,
  abortThreadVote,
  addThreadCategories,
  updateDownVote,
  updateDownVoteComment,
  updateThreadDetails,
  updateThreads,
  updateUpVote,
  updateUpVoteComment,
} from './slice';
import { downVoteComment, upVoteComment } from '../../utils/apis/comment';
import { openAlert } from '../alert/slice';

export const asyncGetThreads = createAsyncThunk(
  'thread/asyncGetThreads',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    const response = await getAllThreads();

    if (response.isError) {
      dispatch(openAlert({ message: response.message }));
    } else {
      dispatch(updateThreads(response.data.threads));
      dispatch(addThreadCategories(response.data.threads));
    }

    dispatch(hideLoading());
  },
);

export const asyncGetThreadDetails = createAsyncThunk(
  'thread/asyncGetThreadDetails',
  async (threadId: string, { dispatch }) => {
    dispatch(showLoading());
    const response = await getThread(threadId);

    if (response.isError) {
      dispatch(openAlert({ message: response.message }));
    } else {
      dispatch(updateThreadDetails(response.data.detailThread));
    }

    dispatch(hideLoading());
  },
);

export const asyncUpVoteThread = createAsyncThunk(
  'thread/asyncUpVoteThread',
  async (
    { threadId, userId }: { threadId: string; userId: string },
    { dispatch },
  ) => {
    dispatch(updateUpVote(userId));

    const response = await upVoteThread(threadId);

    if (response.isError) {
      dispatch(openAlert({ message: response.message }));

      dispatch(abortThreadVote({ type: 'up-vote', userId }));
    }
  },
);

export const asyncDownVoteThread = createAsyncThunk(
  'thread/asyncDownVoteThread',
  async (
    { threadId, userId }: { threadId: string; userId: string },
    { dispatch },
  ) => {
    dispatch(updateDownVote(userId));

    const response = await downVoteThread(threadId);

    if (response.isError) {
      dispatch(openAlert({ message: response.message }));

      dispatch(abortThreadVote({ type: 'down-vote', userId }));
    }
  },
);

export const asyncUpVoteComment = createAsyncThunk(
  'thread/asyncUpVoteComment',
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
      dispatch(openAlert({ message: response.message }));

      dispatch(abortCommentVote({ type: 'up-vote', commentId, userId }));
    }
  },
);

export const asyncDownVoteComment = createAsyncThunk(
  'thread/asyncDownVoteComment',
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
      dispatch(openAlert({ message: response.message }));

      dispatch(abortCommentVote({ type: 'down-vote', commentId, userId }));
    }
  },
);
