import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../utils/apis/users";
import { updateUsers } from "./slice";

export const asyncGetUsers = createAsyncThunk(
  "users/asyncGetUsers",
  async (_, { dispatch }) => {
    const response = await getAllUsers();

    if (response.isError) {
      alert(response.message);
    }

    dispatch(updateUsers(response.data));
  },
);
