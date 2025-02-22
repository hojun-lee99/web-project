import { useState } from 'react';
import { LoginServiceImpl } from './LoginService';
import { LoginState } from '@/redux/loginStateSlice';

export const useLoginState = () => {
  const loginService = new LoginServiceImpl();
  const [loginState, set] = useState<LoginState>({
    userID: '',
    jwt: '',
    timeout: 0,
    onLogin: false,
  });

  const setLoginState = (name: string, args?:any) => {
    switch (name) {
      case 'login':
        loginService.Login(args);
        set(loginService.getLoginState());
        break;
      case 'logout':
        loginService.Logout();
        set(loginService.getLoginState());
        break;
      case 'fakeLogin':
        loginService.FakeLogin();
        set(loginService.getLoginState());
        break;
      case 'loginTimeout':
        loginService.LoginTimeout();
        set(loginService.getLoginState());
        break;
      case 'init':
        set(loginService.getLoginState());
      default:
        break;
    }
  };

  return { loginState, setLoginState };
};
