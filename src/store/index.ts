/* v8 ignore start */
import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from './auth/slice';
import threadReducer from './thread/slice';
import usersReducer from './users/slice';
import leaderboardReducer from './leaderboard/slice';
import alertReducer from './alert/slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer,
    users: usersReducer,
    leaderboard: leaderboardReducer,
    loadingBar: loadingBarReducer,
    alert: alertReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

/* v8 ignore stop */
