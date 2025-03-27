import { createSlice } from "@reduxjs/toolkit";

const threadSlice = createSlice({
  name: "thread",
  initialState: { threads: [] },
  reducers: {
    updateThreads(state, action) {
      state.threads = action.payload;
    },
  },
});

const { actions, reducer } = threadSlice;

export const { updateThreads } = actions;
export default reducer;
