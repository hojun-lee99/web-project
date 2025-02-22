import { useState } from 'react';
import { LoginServiceImpl } from './LoginService';
import { LoginState } from '@/redux/loginStateSlice';

export const useLoginState = () => {
  const loginService = new LoginServiceImpl();
  const [loginState, set] = useState<LoginState>({
    name: '',
    jwt: '',
    timeout: 0,
    onLogin: false,
  });

  const setLoginState = (name: string, args?: any) => {
    switch (name) {
      case 'login':
        loginService.setUserData(args);
        set(loginService.getLoginState());
        break;
      case 'logout':
        loginService.clearUserData();
        set(loginService.getLoginState());
        break;
      case 'fakeLogin':
        loginService.fakeLogin(args);
        set(loginService.getLoginState());
        break;
      case 'loginTimeout':
        loginService.loginTimeout();
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
