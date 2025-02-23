'use client';

import { backend, fakeBackend, UserFormData } from '@/api/axios';
import {
  getLoginLocalStorage,
  removeLoginLocalStorage,
  SaveLocalStorage,
  setLoginLocalStorage,
  timeoutLoginLocalStorage,
} from '@/utils/loginUtils';

export interface LoginService {}
export class LoginServiceImpl implements LoginService {
  static async login(loginObj: UserFormData): Promise<boolean> {
    let message = true;
    try {
      const response = await backend.post('/api/login', {
        ...loginObj,
      });
      response.statusText;
      setLoginLocalStorage({
        name: response.data.name,
        jwt: response.data.jwt,
        onLogin: true,
        timeout: (new Date().getTime() +
          parseInt(process.env.NEXT_PUBLIC_TIMEOUT as string)) as number,
      });
    } catch (error) {
      message = false;
    }
    return message;
  }
  static async logout(): Promise<boolean> {
    let message = true;
    try {
      const response = backend.post('/api/logout');
      LoginServiceImpl.clearUserData();
    } catch (error) {
      message = false;
    }
    return message;
  }
  static async fakeLogin(loginObj: UserFormData): Promise<boolean> {
    let message = true;
    const response = await fakeBackend.login(loginObj);
    setLoginLocalStorage({
      name: response.data.name,
      jwt: response.data.jwt,
      onLogin: true,
      timeout: (new Date().getTime() +
        parseInt(process.env.NEXT_PUBLIC_TIMEOUT as string)) as number,
    });
    return message;
  }
  static async singup(loginObj: UserFormData): Promise<boolean> {
    let message = true;
    try {
      const response = await fakeBackend.signup(loginObj);
    } catch (error) {
      message = false;
    }
    return message;
  }
  static getLoginState(): SaveLocalStorage {
    let loginState: SaveLocalStorage;
    try {
      loginState = getLoginLocalStorage();
    } catch {
      loginState = { name: '', jwt: '', onLogin: false, timeout: 0 };
    }
    return loginState;
  }
  static timeoutCheck(loginObj?: SaveLocalStorage): boolean {
    if (loginObj) {
      return timeoutLoginLocalStorage(loginObj);
    }
    return timeoutLoginLocalStorage(LoginServiceImpl.getLoginState());
  }
  static loginTimeout(): void {
    if (LoginServiceImpl.timeoutCheck()) {
      LoginServiceImpl.logout();
    }
  }
  static setUserData(userData: SaveLocalStorage): void {
    setLoginLocalStorage(userData);
  }
  static clearUserData(): void {
    removeLoginLocalStorage();
  }
}
