'use client';

import { backend, fakeBackend, UserFormData } from '@/api/axios';
import {
  getLoginLocalStorage,
  removeLoginLocalStorage,
  SaveLocalStorage,
  setLoginLocalStorage,
  timeoutLoginLocalStorage,
} from '@/utils/loginUtils';
import axios, { AxiosResponse } from 'axios';

export interface LoginService {
  login(loginObj: UserFormData): Promise<boolean>;
  logout(): Promise<boolean>;
  fakeLogin(loginObj: UserFormData): Promise<boolean>;
  timeoutCheck(loginObj?: SaveLocalStorage): boolean;
  loginTimeout(): void;
  getLoginState(): SaveLocalStorage;
  setUserData(userData: SaveLocalStorage): void;
  clearUserData(): void;
}
export class LoginServiceImpl implements LoginService {
  async login(loginObj: UserFormData): Promise<boolean> {
    let message = true;
    try {
      const response = await backend.post('/api/login', {
        ...loginObj,
      });
      response.statusText;

      // setLoginLocalStorage({
      //   name: response.name,
      //   jwt: response.jwt,
      //   onLogin: true,
      //   timeout: (new Date().getTime() +
      //     parseInt(process.env.NEXT_PUBLIC_TIMEOUT as string)) as number,
      // });
    } catch (error) {
      message = false;
    }
    return message;
  }
  async logout(): Promise<boolean> {
    let message = true;
    try {
      const response = backend.post('/api/logout');
      console.log(response);
      this.clearUserData();
    } catch (error) {
      console.log(error);
      message = false;
    }
    return message;
  }
  async fakeLogin(loginObj: UserFormData): Promise<boolean> {
    let message = true;
    const response = await fakeBackend.getLogin(loginObj);
    setLoginLocalStorage({
      name: response.data.name,
      jwt: response.data.jwt,
      onLogin: true,
      timeout: (new Date().getTime() +
        parseInt(process.env.NEXT_PUBLIC_TIMEOUT as string)) as number,
    });
    return message;
  }
  getLoginState(): SaveLocalStorage {
    let loginState: SaveLocalStorage;
    try {
      loginState = getLoginLocalStorage();
    } catch {
      loginState = { name: '', jwt: '', onLogin: false, timeout: 0 };
    }
    return loginState;
  }
  timeoutCheck(loginObj?: SaveLocalStorage): boolean {
    if (loginObj) {
      return timeoutLoginLocalStorage(loginObj);
    }
    return timeoutLoginLocalStorage(this.getLoginState());
  }
  loginTimeout(): void {
    if (this.timeoutCheck()) {
      this.logout();
    }
  }
  setUserData(userData: SaveLocalStorage): void {
    setLoginLocalStorage(userData);
  }
  clearUserData(): void {
    removeLoginLocalStorage();
  }
}
