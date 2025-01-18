import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface LoginState {
  userId: string | null
  loginOn: boolean
}

const initialState: LoginState = {
  userId: null,
  loginOn: false
}

export const loginStateSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    Login: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.loginOn = true;
    },
    Logout: (state, action: PayloadAction<string>) => {
      state.userId = null;
      state.loginOn = false;
    },
  },
})

export const { Login, Logout } = loginStateSlice.actions

export const selectLogin = (state: RootState) => state.login;

export default loginStateSlice.reducer;