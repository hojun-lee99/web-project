'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { LoginServiceImpl } from '@/service/LoginService';

export interface LoginState {
  userID: string;
  jwt: string;
  timeout: number;
  onLogin: boolean;
}

const loginService = new LoginServiceImpl();

const initialState: LoginState = {
  userID: '',
  jwt: '',
  timeout: 0,
  onLogin: false,
};

export const loginStateSlice = createSlice({
  name: 'userLogin',
  initialState: initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<LoginState>) => {
      loginService.Login(action.payload);
      return (state = loginService.getLoginState());
    },
    userLogout: () => {
      loginService.Logout();
      return loginService.getLoginState();
    },
    userFakeLogin: () => {
      loginService.FakeLogin();
      return loginService.getLoginState();
    },
    userLoginTimeout: () => {
      loginService.LoginTimeout();
      return loginService.getLoginState();
    },
    userLoginInit: () => {
      return loginService.getLoginState();
    },
  },
});

export const {
  userLogin,
  userLogout,
  userFakeLogin,
  userLoginTimeout,
  userLoginInit,
} = loginStateSlice.actions;

export const selectLoginState = (state: RootState) => state.userLogin;

export default loginStateSlice.reducer;
