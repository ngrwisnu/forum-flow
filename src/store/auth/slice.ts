import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/user";
import { getAccessToken, getUserFromStorage } from "../../utils/apis/auths";

const isAuthenticated = !!getAccessToken();
const authenticatedUser = getUserFromStorage();

const initialState: {
  user: UserType | null;
  isAuthenticated: boolean;
} = {
  user: authenticatedUser,
  isAuthenticated,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    userLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

const { actions, reducer } = authSlice;

export const { userLogin, userLogout } = actions;
export default reducer;
