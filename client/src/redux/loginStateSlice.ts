'use client';

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  removeLoginLocalStorage,
  SaveLocalStorage,
  setLoginLocalStorage,
} from '@/utils/loginUtils';

interface LoginState {
  userID: string | null;
  jwt: string | null;
  timeout: Date | null;
  onLogin: boolean;
}

const initialState: LoginState = {
  userID: null,
  jwt: null,
  timeout: null,
  onLogin: false,
};

export const loginStateSlice = createSlice({
  name: 'userLogin',
  initialState: initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<LoginState>) => {
      state.userID = action.payload.userID;
      state.jwt = action.payload.jwt;
      state.onLogin = true;
      setLoginLocalStorage({
        userID: action.payload.userID,
        onLogin: true,
      } as SaveLocalStorage);
    },
    userLogout: (state) => {
      state.userID = null;
      state.jwt = null;
      state.onLogin = false;
      removeLoginLocalStorage();
    },
    userFakeLogin: (state) => {
      state.userID = '';
      state.jwt = '';
      state.onLogin = true;
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
