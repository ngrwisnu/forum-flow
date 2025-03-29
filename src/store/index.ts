import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import threadReducer from "./thread/slice";
import usersReducer from "./users/slice";
import leaderboardReducer from "./leaderboard/slice";
import { loadingBarReducer } from "react-redux-loading-bar";

const store = configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer,
    users: usersReducer,
    leaderboard: leaderboardReducer,
    loadingBar: loadingBarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
