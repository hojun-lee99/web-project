'use client';

import { configureStore } from '@reduxjs/toolkit';
import userLogin from '@/redux/loginStateSlice';
import loginPopup from '@/redux/loginPopupStateSlice';

const store = configureStore({
  reducer: {
    userLogin: userLogin,
    loginPopup: loginPopup,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
