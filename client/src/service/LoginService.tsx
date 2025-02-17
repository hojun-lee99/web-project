'use client';

import {
  getLoginLocalStorage,
  removeLoginLocalStorage,
  SaveLocalStorage,
  setLoginLocalStorage,
  timeoutLoginLocalStorage,
} from '@/utils/loginUtils';

export interface LoginService {
  Login(loginObj: SaveLocalStorage): void;
  Logout(): void;
  FakeLogin(): void;
  getLoginState(): SaveLocalStorage;
}

export class LoginServiceImpl implements LoginService {
  Login(loginObj: SaveLocalStorage) {
    setLoginLocalStorage(loginObj);
  }
  Logout(): void {
    removeLoginLocalStorage();
  }
  FakeLogin(): void {
    setLoginLocalStorage({
      jwt: '',
      onLogin: true,
      timeout: (new Date().getTime() +
        parseInt(process.env.NEXT_PUBLIC_TIMEOUT as string)) as number,
      userID: '',
    });
  }
  getLoginState(): SaveLocalStorage {
    let loginState: SaveLocalStorage;
    try {
      loginState = getLoginLocalStorage();
    } catch (error) {
      loginState = { userID: '', jwt: '', onLogin: false, timeout: 0 };
    }
    return loginState;
  }
  timeoutCheck(loginObj?: SaveLocalStorage): boolean {
    if (loginObj) {
      return timeoutLoginLocalStorage(loginObj);
    }
    return timeoutLoginLocalStorage(this.getLoginState());
  }
  LoginTimeout(): void {
    if (this.timeoutCheck()) {
      this.Logout();
    }
  }
}
