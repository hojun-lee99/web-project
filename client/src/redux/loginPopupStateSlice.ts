'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type LoginPopupStateType = 'login' | 'signup' | string | null;

export interface LoginPopupState {
  type: LoginPopupStateType;
}

const initialState: LoginPopupState = {
  type: null,
};

export const loginPopupStateSlice = createSlice({
  name: 'loginPopup',
  initialState: initialState,
  reducers: {
    setLoginPopupState: (state, action: PayloadAction<LoginPopupStateType>) => {
      return { ...state, type: action.payload };
    },
    setPopupStateNull: () => {
      return { type: null };
    },
    setPopupStateLogin: () => {
      return { type: 'login' };
    },
    setPopupStateSignup: () => {
      return { type: 'signup' };
    },
  },
});

export const {
  setLoginPopupState,
  setPopupStateLogin,
  setPopupStateNull,
  setPopupStateSignup,
} = loginPopupStateSlice.actions;

export const selectLoginPopupState = (state: RootState) => state.loginPopup;

export default loginPopupStateSlice.reducer;
