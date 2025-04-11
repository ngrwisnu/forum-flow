/*
* asyncGetThreads
- should be able to dispatch actions
- should dispatch openAlert on error response
* asyncGetThreadDetails
- should be able to dispatch actions
- should dispatch openAlert on error response
* asyncUpVoteThread
- should handle successful dispatch upvote
- should revert vote and dispatch openAlert on error
* asyncDownVoteThread
- should handle successful dispatch downvote
- should revert downvote and dispatch openAlert on error
* asyncUpVoteComment
- should handle successful dispatch upvote comment
- should revert upvote comment and dispatch openAlert on error
* asyncDownVoteComment
- should handle successful dispatch downvote comment
- should revert downvote comment and dispatch openAlert on error
*/

import { describe, test, expect, vi, afterEach, Mock } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  downVoteThread,
  getAllThreads,
  getThread,
  upVoteThread,
} from '../../../utils/apis/threads';
import {
  asyncDownVoteComment,
  asyncDownVoteThread,
  asyncGetThreadDetails,
  asyncGetThreads,
  asyncUpVoteComment,
  asyncUpVoteThread,
} from '../action';
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
} from '../slice';
import { errorResponse } from '../../../../__tests__/helpers/errorResponse';
import { downVoteComment, upVoteComment } from '../../../utils/apis/comment';
import { openAlert } from '../../alert/slice';

vi.mock('../../../utils/apis/threads');
vi.mock('../../../utils/apis/comment');

const dummyUser = { id: 'user-1', name: 'User1', email: 'user-1@example.com' };

const dummyThread = {
  id: 'thread-1',
  title: 'Hello',
  body: 'Body',
  category: 'react',
  createdAt: new Date().toISOString(),
  owner: dummyUser,
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};

describe('threadThunk', () => {
  const mockDispatch = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  describe('asyncGetThreads', () => {
    test('should be able to dispatch actions', async () => {
      const threads = [dummyThread];

      (getAllThreads as Mock).mockResolvedValue({
        isError: false,
        data: { threads },
      });

      await asyncGetThreads()(mockDispatch, () => ({}), undefined);

      expect(mockDispatch).toHaveBeenCalledWith(showLoading());
      expect(mockDispatch).toHaveBeenCalledWith(updateThreads(threads));
      expect(mockDispatch).toHaveBeenCalledWith(addThreadCategories(threads));
      expect(mockDispatch).toHaveBeenCalledWith(hideLoading());
    });

    test('should dispatch openAlert on error response', async () => {
      const error = errorResponse('Failed to fetch');

      (getAllThreads as Mock).mockResolvedValue(error);

      await asyncGetThreads()(mockDispatch, () => ({}), undefined);

      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({ message: error.message }),
      );
    });
  });

  describe('asyncGetThreadDetails', () => {
    test('should be able to dispatch actions', async () => {
      (getThread as Mock).mockResolvedValue({
        isError: false,
        data: {
          detailThread: dummyThread,
        },
      });

      await asyncGetThreadDetails('thread-1')(
        mockDispatch,
        () => ({}),
        undefined,
      );

      expect(mockDispatch).toHaveBeenCalledWith(showLoading());
      expect(mockDispatch).toHaveBeenCalledWith(
        updateThreadDetails(dummyThread),
      );
      expect(mockDispatch).toHaveBeenCalledWith(hideLoading());
    });

    test('should dispatch openAlert on error response', async () => {
      const error = errorResponse('Thread not found');

      (getThread as Mock).mockResolvedValue(error);

      await asyncGetThreadDetails('xxx-id')(
        mockDispatch,
        () => ({}),
        undefined,
      );

      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({ message: error.message }),
      );
    });
  });

  describe('asyncUpVoteThread', () => {
    test('should handle successful dispatch upvote', async () => {
      (upVoteThread as Mock).mockResolvedValue({ isError: false, data: {} });

      await asyncUpVoteThread({ threadId: 'thread-1', userId: 'user-1' })(
        mockDispatch,
        () => ({}),
        undefined,
      );

      expect(mockDispatch).toHaveBeenCalledWith(updateUpVote('user-1'));
      expect(mockDispatch).not.toHaveBeenCalledWith(
        abortThreadVote({ type: 'up-vote', userId: 'user-1' }),
      );
    });

    test('should revert vote and dispatch openAlert on error', async () => {
      const error = errorResponse('Vote failed');

      (upVoteThread as Mock).mockResolvedValue(error);

      await asyncUpVoteThread({ threadId: 'thread-1', userId: 'user-1' })(
        mockDispatch,
        () => ({}),
        undefined,
      );

      expect(mockDispatch).toHaveBeenCalledWith(updateUpVote('user-1'));
      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({ message: error.message }),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        abortThreadVote({ type: 'up-vote', userId: 'user-1' }),
      );
    });
  });

  describe('asyncDownVoteThread', () => {
    test('should handle successful dispatch downvote', async () => {
      (downVoteThread as Mock).mockResolvedValue({ isError: false, data: {} });

      await asyncDownVoteThread({ threadId: 'thread-1', userId: 'user-1' })(
        mockDispatch,
        () => ({}),
        undefined,
      );

      expect(mockDispatch).toHaveBeenCalledWith(updateDownVote('user-1'));
      expect(mockDispatch).not.toHaveBeenCalledWith(
        abortThreadVote({ type: 'down-vote', userId: 'user-1' }),
      );
    });

    test('should revert downvote and dispatch openAlert on error', async () => {
      const error = errorResponse('Vote failed');

      (downVoteThread as Mock).mockResolvedValue(error);

      await asyncDownVoteThread({ threadId: 'thread-1', userId: 'user-1' })(
        mockDispatch,
        () => ({}),
        undefined,
      );

      expect(mockDispatch).toHaveBeenCalledWith(updateDownVote('user-1'));
      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({ message: error.message }),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        abortThreadVote({ type: 'down-vote', userId: 'user-1' }),
      );
    });
  });

  describe('asyncUpVoteComment', () => {
    const props = {
      threadId: 'thread-1',
      commentId: 'comment-1',
      userId: 'user-1',
    };

    test('should handle successful dispatch upvote comment', async () => {
      (upVoteComment as Mock).mockResolvedValue({ isError: false, data: {} });

      await asyncUpVoteComment(props)(mockDispatch, () => ({}), undefined);

      expect(mockDispatch).toHaveBeenCalledWith(
        updateUpVoteComment({
          commentId: props.commentId,
          userId: props.userId,
        }),
      );
      expect(mockDispatch).not.toHaveBeenCalledWith(
        abortCommentVote({
          type: 'up-vote',
          commentId: props.commentId,
          userId: props.userId,
        }),
      );
    });

    test('should revert upvote comment and dispatch openAlert on error', async () => {
      const error = errorResponse('Vote failed');

      (upVoteComment as Mock).mockResolvedValue(error);

      await asyncUpVoteComment(props)(mockDispatch, () => ({}), undefined);

      expect(mockDispatch).toHaveBeenCalledWith(
        updateUpVoteComment({
          commentId: props.commentId,
          userId: props.userId,
        }),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({ message: error.message }),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        abortCommentVote({
          type: 'up-vote',
          commentId: props.commentId,
          userId: props.userId,
        }),
      );
    });
  });

  describe('asyncDownVoteComment', () => {
    const props = {
      threadId: 'thread-1',
      commentId: 'comment-1',
      userId: 'user-1',
    };

    test('should handle successful dispatch downvote comment', async () => {
      (downVoteComment as Mock).mockResolvedValue({ isError: false, data: {} });

      await asyncDownVoteComment(props)(mockDispatch, () => ({}), undefined);

      expect(mockDispatch).toHaveBeenCalledWith(
        updateDownVoteComment({
          commentId: props.commentId,
          userId: props.userId,
        }),
      );
      expect(mockDispatch).not.toHaveBeenCalledWith(
        abortCommentVote({
          type: 'down-vote',
          commentId: props.commentId,
          userId: props.userId,
        }),
      );
    });

    test('should revert downvote comment and dispatch openAlert on error', async () => {
      const error = errorResponse('Vote error');

      (downVoteComment as Mock).mockResolvedValue(error);

      await asyncDownVoteComment(props)(mockDispatch, () => ({}), undefined);

      expect(mockDispatch).toHaveBeenCalledWith(
        updateDownVoteComment({
          commentId: props.commentId,
          userId: props.userId,
        }),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({ message: error.message }),
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        abortCommentVote({
          type: 'down-vote',
          commentId: props.commentId,
          userId: props.userId,
        }),
      );
    });
  });
});
