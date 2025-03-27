import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  register,
  updateTokenInStorage,
  updateUserDetailsInStorage,
} from "../../utils/api/auth";
import { LoginRequest, SignupRequest } from "../../types/auth";
import { getUserProfile } from "../../utils/api/user";
import { userLogin, userLogout, userSignup } from "./slice";

export const asyncUserSignup = createAsyncThunk(
  "auth/asyncUserSignup",
  async ({ name, email, password }: SignupRequest, { dispatch }) => {
    const response = await register({ name, email, password });

    if (response.isError) {
      dispatch(userSignup(false));
      alert(response.message);
    }

    dispatch(userSignup(true));
  },
);

export const asyncUserLogin = createAsyncThunk(
  "auth/asyncUserLogin",
  async ({ email, password }: LoginRequest, { dispatch }) => {
    const response = await login(email, password);

    if (response.isError) {
      alert(response.message);
    }

    updateTokenInStorage(response.data.token);

    const userData = await getUserProfile();

    if (userData.isError) {
      alert(userData.message);
    }

    updateUserDetailsInStorage(userData.data.user);

    dispatch(userLogin(userData.data.user));
  },
);

export const asyncUserLogout = createAsyncThunk(
  "auth/asyncUserLogout",
  async (_, { dispatch }) => {
    updateTokenInStorage("");
    updateUserDetailsInStorage({});

    dispatch(userLogout());
  },
);
