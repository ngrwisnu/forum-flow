import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  login,
  register,
  updateTokenInStorage,
  updateUserDetailsInStorage,
} from '../../utils/apis/auths';
import { LoginRequest, SignupRequest } from '../../types/auth';
import { getUserProfile } from '../../utils/apis/users';
import { userLogin, userLogout } from './slice';
import { openAlert } from '../alert/slice';

export const asyncUserSignup = createAsyncThunk(
  'auth/asyncUserSignup',
  async ({ name, email, password }: SignupRequest, { dispatch }) => {
    const response = await register({ name, email, password });

    if (response.isError) {
      dispatch(openAlert({ message: response.message }));
    }

    return response.data;
  },
);

export const asyncUserLogin = createAsyncThunk(
  'auth/asyncUserLogin',
  async ({ email, password }: LoginRequest, { dispatch }) => {
    const response = await login(email, password);

    if (response.isError) {
      dispatch(openAlert({ message: response.message }));
      return;
    }

    updateTokenInStorage(response.data.token);

    const userData = await getUserProfile();

    if (userData.isError) {
      dispatch(openAlert({ message: userData.message }));
      return;
    }

    updateUserDetailsInStorage(userData.data.user);

    dispatch(userLogin(userData.data.user));
  },
);

export const asyncUserLogout = createAsyncThunk(
  'auth/asyncUserLogout',
  async (_, { dispatch }) => {
    updateTokenInStorage('');
    updateUserDetailsInStorage({});

    dispatch(userLogout());
  },
);
