'use client';

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { LoginServiceImpl } from '@/service/LoginService';

export interface LoginState {
  name: string;
  jwt: string;
  timeout: number;
  onLogin: boolean;
}

const initialState: LoginState = {
  name: '',
  jwt: '',
  timeout: 0,
  onLogin: false,
};

export const loginStateSlice = createSlice({
  name: 'userLogin',
  initialState: initialState,
  reducers: {
    initUserData: () => {
      return LoginServiceImpl.getLoginState();
    },
  },
});

export const { initUserData } = loginStateSlice.actions;

export const selectLoginState = (state: RootState) => state.userLogin;

export default loginStateSlice.reducer;
