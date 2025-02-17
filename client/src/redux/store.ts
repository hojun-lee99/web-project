'use client';

import { configureStore } from '@reduxjs/toolkit';
import userLogin from './loginStateSlice';

const store = configureStore({
  reducer: {
    userLogin: userLogin,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
