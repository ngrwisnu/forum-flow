import { createSlice } from '@reduxjs/toolkit';
import { UsersResponse } from '../../types/user';

const initialUsers: {
  users: UsersResponse;
} = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
  },
});

const { actions, reducer } = usersSlice;

export const { updateUsers } = actions;
export default reducer;
