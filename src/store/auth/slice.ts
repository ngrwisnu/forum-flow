import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isSignupSuccess: false },
  reducers: {
    userSignup(state, action) {
      state.isSignupSuccess = action.payload;
    },
    userLogin(state, action) {
      state.user = action.payload;
    },
    userLogout(state) {
      state.user = null;
    },
  },
});

const { actions, reducer } = authSlice;

export const { userSignup, userLogin, userLogout } = actions;
export default reducer;
