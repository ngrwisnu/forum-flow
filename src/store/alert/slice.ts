import { createSlice } from '@reduxjs/toolkit';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

const initialState: {
  isOpen: boolean;
  message: string;
  type: AlertType;
} = {
  isOpen: false,
  message: '',
  type: 'warning',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    openAlert(state, action) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type || 'warning';
    },
    closeAlert(state) {
      state.isOpen = false;
      state.message = '';
    },
  },
});

const { actions, reducer } = alertSlice;

export const { openAlert, closeAlert } = actions;
export default reducer;
