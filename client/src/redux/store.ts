import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginStateSlice'

const store = configureStore({
  reducer: {
    login: loginReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;