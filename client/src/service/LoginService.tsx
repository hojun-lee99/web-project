'use client';

import {
  backend,
  backendWithCredentials,
  fakeBackend,
  UserFormData,
} from '@/api/axios';
import {
  getLoginLocalStorage,
  getTimoutTime,
  removeLoginLocalStorage,
  SaveLocalStorage,
  setLoginLocalStorage,
  timeoutLoginLocalStorage,
} from '@/utils/loginUtils';

export interface LoginService {
  hello: string;
}
export class LoginServiceImpl implements LoginService {
  hello = 'HELLO';
  static async login(loginObj: UserFormData): Promise<boolean> {
    let message = true;
    try {
      const response = await backend.post('/auth/login', loginObj);
      LoginServiceImpl.setUserData({
        name: response.data.name,
        jwt: response.data.accessToken,
        onLogin: true,
        timeout: getTimoutTime(),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      message = false;
    }
    return message;
  }
  static async logout(): Promise<boolean> {
    backendWithCredentials(true);
    let message = true;
    try {
      const response = await backend.post('/auth/logout');
      console.log('logout');
      console.log(response);
      LoginServiceImpl.clearUserData();
    } catch (error) {
      console.log('logoutError');
      console.log(error);
      message = false;
    }
    backendWithCredentials(false);
    return message;
  }
  static async refreshJWT(): Promise<boolean> {
    backendWithCredentials(true);
    let message = true;
    try {
      const response = await backend.post('/auth/refresh');
      console.log(response);
      const oldData = LoginServiceImpl.getLoginState();
      const newData: SaveLocalStorage = {
        name: oldData.name,
        jwt: response.data.accessToken,
        onLogin: true,
        timeout: getTimoutTime(),
      };
      LoginServiceImpl.setUserData(newData);
    } catch (error) {
      await LoginServiceImpl.logout();
      console.log(error);
      message = false;
    }
    backendWithCredentials(false);
    return message;
  }
  static async fakeLogin(loginObj: UserFormData): Promise<boolean> {
    let message = true;
    const response = await fakeBackend.login(loginObj);
    setLoginLocalStorage({
      name: response.data.name,
      jwt: response.data.jwt,
      onLogin: true,
      timeout: getTimoutTime(),
    });
    return message;
  }
  static async singup(loginObj: UserFormData): Promise<boolean> {
    let message = true;
    try {
      const response = await backend.post('/auth/register', loginObj);
      console.log(response);
    } catch (error) {
      console.log(error);
      message = false;
    }
    return message;
  }
  static async fakeSingup(loginObj: UserFormData): Promise<boolean> {
    let message = true;
    try {
      const response = await fakeBackend.signup(loginObj);
      console.log(response);
    } catch (error) {
      console.log(error);
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
