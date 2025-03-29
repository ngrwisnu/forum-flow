import { createSlice } from "@reduxjs/toolkit";
import { ThreadDetailsType, ThreadsResponse } from "../../types/thread";

const initialState: {
  threads: ThreadsResponse;
  threadDetails: ThreadDetailsType | null;
} = {
  threads: [],
  threadDetails: null,
};

const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    updateThreads(state, action) {
      state.threads = action.payload;
    },
    updateThreadDetails(state, action) {
      state.threadDetails = action.payload;
    },
    updateUpVote(state, action) {
      const isAlreadyUpVote = state.threadDetails?.upVotesBy.includes(
        action.payload,
      );

      if (state.threadDetails) {
        state.threadDetails.downVotesBy =
          state.threadDetails.downVotesBy.filter(
            (user) => user !== action.payload,
          );
      }

      if (!isAlreadyUpVote) {
        state.threadDetails?.upVotesBy.push(action.payload);
      }
    },
    updateDownVote(state, action) {
      const isAlreadyDownVote = state.threadDetails?.downVotesBy.includes(
        action.payload,
      );

      if (state.threadDetails) {
        state.threadDetails.upVotesBy = state.threadDetails.upVotesBy.filter(
          (user) => user !== action.payload,
        );
      }

      if (!isAlreadyDownVote) {
        state.threadDetails?.downVotesBy.push(action.payload);
      }
    },
    abortThreadVote(state, action) {
      const voteType =
        action.payload.type === "up-vote" ? "upVotesBy" : "downVotesBy";

      if (state.threadDetails) {
        state.threadDetails[voteType] = state.threadDetails[voteType].filter(
          (user) => user !== action.payload.userId,
        );
      }
    },
    updateUpVoteComment(state, action) {
      const targetComment = state.threadDetails?.comments.find(
        (comment) => comment.id === action.payload.commentId,
      );
      const isAlreadyUpVote =
        targetComment &&
        targetComment.upVotesBy.includes(action.payload.userId);

      // remove user from down vote list
      if (state.threadDetails && targetComment) {
        targetComment.downVotesBy = targetComment.downVotesBy.filter(
          (user) => user !== action.payload.userId,
        );
      }

      // add user to up vote list
      if (!isAlreadyUpVote) {
        targetComment?.upVotesBy.push(action.payload.userId);
      }
    },
    updateDownVoteComment(state, action) {
      const targetComment = state.threadDetails?.comments.find(
        (comment) => comment.id === action.payload.commentId,
      );
      const isAlreadyUpVote =
        targetComment &&
        targetComment.downVotesBy.includes(action.payload.userId);

      // remove user from up vote list
      if (state.threadDetails && targetComment) {
        targetComment.upVotesBy = targetComment.upVotesBy.filter(
          (user) => user !== action.payload.userId,
        );
      }

      // add user to down vote list
      if (!isAlreadyUpVote) {
        targetComment?.downVotesBy.push(action.payload.userId);
      }
    },
    abortCommentVote(state, action) {
      const targetComment = state.threadDetails?.comments.find(
        (comment) => comment.id === action.payload.commentId,
      );
      const voteType =
        action.payload.type === "up-vote" ? "upVotesBy" : "downVotesBy";

      if (state.threadDetails && targetComment) {
        targetComment[voteType] = targetComment[voteType].filter(
          (user) => user !== action.payload.userId,
        );
      }
    },
  },
});

const { actions, reducer } = threadSlice;

export const {
  updateThreads,
  updateThreadDetails,
  updateUpVote,
  updateDownVote,
  abortThreadVote,
  updateUpVoteComment,
  updateDownVoteComment,
  abortCommentVote,
} = actions;
export default reducer;
