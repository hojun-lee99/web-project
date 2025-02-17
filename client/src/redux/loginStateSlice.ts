'use client';

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
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
    userLogout: (state) => {
      loginService.Logout();
      return (state = loginService.getLoginState());
    },
    userFakeLogin: (state) => {
      loginService.FakeLogin();
      return (state = loginService.getLoginState());
    },
    userLoginTimeout: (state) => {
      loginService.LoginTimeout();
      return (state = loginService.getLoginState());
    },
    userLoginInit: (state) => {
      return (state = loginService.getLoginState());
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
