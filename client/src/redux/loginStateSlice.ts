'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { LoginServiceImpl } from '@/service/LoginService';
import { UserFormData } from '@/api/axios';

export interface LoginState {
  name: string;
  jwt: string;
  timeout: number;
  onLogin: boolean;
}

const loginService = new LoginServiceImpl();

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
    setUserData: () => {
      return loginService.getLoginState();
    },
    clearUserData: () => {
      loginService.logout();
      return loginService.getLoginState();
    },
    userFakeLogin: (state, action: PayloadAction<UserFormData>) => {
      return loginService.getLoginState();
    },
    timeoutUserData: () => {
      loginService.loginTimeout();
      return loginService.getLoginState();
    },
    initUserData: () => {
      return loginService.getLoginState();
    },
  },
});

export const {
  setUserData,
  clearUserData,
  userFakeLogin,
  timeoutUserData,
  initUserData,
} = loginStateSlice.actions;

export const selectLoginState = (state: RootState) => state.userLogin;

export default loginStateSlice.reducer;
