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
  },
});

const { actions, reducer } = threadSlice;

export const {
  updateThreads,
  updateThreadDetails,
  updateUpVote,
  updateDownVote,
  abortThreadVote,
} = actions;
export default reducer;
