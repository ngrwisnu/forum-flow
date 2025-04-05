import { describe, test, expect } from 'vitest';
import threadReducer, {
  updateThreads,
  updateThreadDetails,
  addThreadCategories,
  updateUpVote,
  updateDownVote,
  abortThreadVote,
  updateUpVoteComment,
  updateDownVoteComment,
  abortCommentVote,
} from '../slice';

const dummyUser = { id: 'user-1', name: 'User1', email: 'user-1@example.com' };

const dummyComment = {
  id: 'comment-1',
  content: 'Hello!',
  createdAt: new Date().toISOString(),
  owner: dummyUser,
  upVotesBy: [],
  downVotesBy: [],
};

const dummyThread = {
  id: 'thread-1',
  title: 'Hello',
  body: 'Body',
  category: 'react',
  createdAt: new Date().toISOString(),
  owner: dummyUser,
  upVotesBy: [],
  downVotesBy: [],
  comments: [dummyComment],
};

const initialState = {
  threads: [],
  threadDetails: null,
  threadCategories: [],
};

describe('thread-slice', () => {
  test('updateThreads should replace the old threads state', () => {
    const nextState = threadReducer(initialState, updateThreads([dummyThread]));

    expect(nextState.threads).toEqual([dummyThread]);
    expect(nextState.threads.length).toBe(1);
  });

  test('updateThreadDetails should update the state of threadDetails', () => {
    const nextState = threadReducer(
      initialState,
      updateThreadDetails(dummyThread),
    );

    expect(nextState.threadDetails).toEqual(dummyThread);
    expect(nextState.threadDetails?.id).toBe(dummyThread.id);
  });

  test('addThreadCategories should be able to collect unique categories', () => {
    const threads = [
      { ...dummyThread, category: 'react' },
      { ...dummyThread, id: 'thread-2', category: 'redux' },
      { ...dummyThread, id: 'thread-3', category: 'react' },
    ];

    const nextState = threadReducer(initialState, addThreadCategories(threads));

    expect(nextState.threadCategories.length).toBe(2);
    expect(nextState.threadCategories).toContain('react');
    expect(nextState.threadCategories).toContain('redux');
  });

  test('updateUpVote should be able to add up-vote and removes down-vote if necessary', () => {
    const oldState = {
      threads: [],
      threadDetails: {
        ...dummyThread,
        upVotesBy: [],
        downVotesBy: ['user-1'],
      },
      threadCategories: [],
    };

    const nextState = threadReducer(oldState, updateUpVote('user-1'));

    expect(nextState.threadDetails?.upVotesBy).toContain('user-1');
    expect(nextState.threadDetails?.downVotesBy).not.toContain('user-1');
  });

  test('updateDownVote should be able to add down-vote and removes up-vote if necessary', () => {
    const oldState = {
      threads: [],
      threadDetails: {
        ...dummyThread,
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
      threadCategories: [],
    };

    const nextState = threadReducer(oldState, updateDownVote('user-1'));

    expect(nextState.threadDetails?.upVotesBy).not.toContain('user-1');
    expect(nextState.threadDetails?.downVotesBy).toContain('user-1');
  });

  test('abortThreadVote removes user from correct vote type', () => {
    const oldState = {
      threads: [],
      threadDetails: {
        ...dummyThread,
        upVotesBy: ['user-1'],
        downVotesBy: ['user-2'],
      },
      threadCategories: [],
    };

    const upVoteState = threadReducer(
      oldState,
      abortThreadVote({ userId: 'user-1', type: 'up-vote' }),
    );
    expect(upVoteState.threadDetails?.upVotesBy).not.toContain('user-1');

    const downVoteState = threadReducer(
      oldState,
      abortThreadVote({ userId: 'user-2', type: 'down-vote' }),
    );
    expect(downVoteState.threadDetails?.downVotesBy).not.toContain('user-2');
  });

  test('updateUpVoteComment should be able to add up-vote and removes down-vote on a comment', () => {
    const oldState = {
      threads: [],
      threadDetails: {
        ...dummyThread,
        comments: [{ ...dummyComment, downVotesBy: ['user-1'], upVotesBy: [] }],
      },
      threadCategories: [],
    };

    const nextState = threadReducer(
      oldState,
      updateUpVoteComment({
        commentId: 'comment-1',
        userId: 'user-1',
      }),
    );

    const comment = nextState.threadDetails?.comments[0];

    expect(comment?.upVotesBy).toContain('user-1');
    expect(comment?.downVotesBy).not.toContain('user-1');
  });

  test('updateDownVoteComment should be able to add down-vote and removes up-vote on a comment', () => {
    const oldState = {
      threads: [],
      threadDetails: {
        ...dummyThread,
        comments: [{ ...dummyComment, upVotesBy: ['user-1'], downVotesBy: [] }],
      },
      threadCategories: [],
    };

    const nextState = threadReducer(
      oldState,
      updateDownVoteComment({
        commentId: 'comment-1',
        userId: 'user-1',
      }),
    );

    const comment = nextState.threadDetails?.comments[0];

    expect(comment?.downVotesBy).toContain('user-1');
    expect(comment?.upVotesBy).not.toContain('user-1');
  });

  test('abortCommentVote should be able to remove user from correct vote type in a comment', () => {
    const oldState = {
      threads: [],
      threadDetails: {
        ...dummyThread,
        comments: [
          {
            ...dummyComment,
            upVotesBy: ['user-1'],
            downVotesBy: ['user-2'],
          },
        ],
      },
      threadCategories: [],
    };

    const nextStateUp = threadReducer(
      oldState,
      abortCommentVote({
        commentId: 'comment-1',
        userId: 'user-1',
        type: 'up-vote',
      }),
    );

    const nextStateDown = threadReducer(
      oldState,
      abortCommentVote({
        commentId: 'comment-1',
        userId: 'user-2',
        type: 'down-vote',
      }),
    );

    expect(nextStateUp.threadDetails?.comments[0].upVotesBy).not.toContain(
      'user-1',
    );
    expect(nextStateDown.threadDetails?.comments[0].downVotesBy).not.toContain(
      'user-2',
    );
  });
});
