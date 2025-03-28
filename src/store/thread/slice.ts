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
  },
});

const { actions, reducer } = threadSlice;

export const { updateThreads, updateThreadDetails } = actions;
export default reducer;
