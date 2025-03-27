import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  updateTokenInStorage,
  updateUserDetailsInStorage,
} from "../../utils/api/auth";
import { LoginRequest } from "../../types/auth";
import { getUserProfile } from "../../utils/api/user";
import { userLogin, userLogout } from "./slice";

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
