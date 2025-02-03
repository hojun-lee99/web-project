'use client';

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './test_store';

// Define a type for the slice state
interface LoginState {
  userID: string | null;
  jwt: string | null;
}

// Define the initial state using that type
const initialState: LoginState = {
  userID: null,
  jwt: null,
};

export const loginStateSlice = createSlice({
  name: 'userLogin',
  initialState: initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<LoginState>) => {},
    userLogout: (state) => {
      return { userID: null, jwt: null };
    },
  },
});

export const { userLogin, userLogout } = loginStateSlice.actions;

export const selectLoginState = (state: RootState) => state.userLogin;

const fetchCount = createAsyncThunk('counter/fetchCount', async () => {
  const response = null;
  return response;
});

export default loginStateSlice.reducer;
