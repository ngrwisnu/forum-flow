import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import threadReducer from "./thread/slice";
import usersReducer from "./users/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
