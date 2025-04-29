'use-client';

import { LoginState } from '@/redux/loginStateSlice';
import { throwClientError } from './clientUtils';

export interface SaveLocalStorage extends LoginState {
  name: string;
  jwt: string;
  onLogin: boolean;
  timeout: number;
}

function isSaveLocalStorage(arg: any): arg is SaveLocalStorage {
  if (arg.userID === 'undefined') {
    return false;
  }
  if (arg.onLogin === 'undefined') {
    return false;
  }
  if (arg.timeout === 'undefined') {
    return false;
  }
  if (arg.jwt === 'undefined') {
    return false;
  }
  return true;
}

export function checkLoginLocalStorage(): boolean {
  throwClientError();

  let ok: boolean = false;
  const check: string | null = localStorage.getItem(
    process.env.NEXT_PUBLIC_MY_LOGIN_USER as string,
  );

  if (check !== null) {
    ok = true;
  }

  return ok;
}

export function getTimoutTime(): number {
  return (new Date().getTime() +
    parseInt(process.env.NEXT_PUBLIC_TIMEOUT as string)) as number;
}

export function timeoutLoginLocalStorage(
  time: SaveLocalStorage | Date,
): boolean {
  let check = false;
  if (isSaveLocalStorage(time)) {
    check = timeoutChecksaveLocalStorage(time);
  } else {
    check = timeoutCheckDate(time);
  }
  return check;
}

function timeoutCheckDate(date: Date): boolean {
  let timeout = false;
  const now = new Date();
  const check = date.getTime() - now.getTime();
  if (check <= 0) {
    timeout = true;
  }
  return timeout;
}

function timeoutChecksaveLocalStorage(
  saveLocalStorage: SaveLocalStorage,
): boolean {
  let timeout = false;
  const now = new Date();
  const check = saveLocalStorage.timeout - now.getTime();
  if (check <= 0) {
    timeout = true;
  }
  return timeout;
}

export function getLoginLocalStorage(): SaveLocalStorage {
  throwClientError();

  let get: string | null | SaveLocalStorage = localStorage.getItem(
    process.env.NEXT_PUBLIC_MY_LOGIN_USER as string,
  );

  if (get === null) {
    throw { error: 'getLoginLocalStorageError' };
  } else if (typeof get === 'string') {
    get = saveLocalStorageJsonParse(get);
  }

  return get;
}

export function setLoginLocalStorage(saveObj: SaveLocalStorage): boolean {
  throwClientError();

  const SaveLocalStorage: string = saveLocalStorageJsonStringify(saveObj);
  window.localStorage.setItem(
    process.env.NEXT_PUBLIC_MY_LOGIN_USER as string,
    SaveLocalStorage,
  );
  return true;
}

export function saveLocalStorageJsonParse(jsonStr: string): SaveLocalStorage {
  let jsonObj: SaveLocalStorage | null = null;

  const obj = JSON.parse(jsonStr);

  saveLocalStorageCheck(obj);

  jsonObj = obj as SaveLocalStorage;

  return jsonObj;
}

export function saveLocalStorageJsonStringify(
  jsonObj: SaveLocalStorage,
): string {
  let jsonStr: string | null = null;

  saveLocalStorageCheck(jsonObj);

  jsonStr = JSON.stringify(jsonObj);

  return jsonStr;
}

export function saveLocalStorageCheck(obj: SaveLocalStorage): void {
  const requiredKeys1: (keyof SaveLocalStorage)[] = [
    'name',
    'jwt',
    'onLogin',
    'timeout',
  ];
  const requiredKeys2 = Object.fromEntries(
    requiredKeys1.map((key) => [key, null]),
  );
  const valid1 = requiredKeys1.every((key) => {
    return key in obj;
  });
  const valid2 = Object.keys(obj).every((key) => {
    return key in requiredKeys2;
  });

  if (!(valid1 && valid2)) {
    throw { error: 'check error' };
  }
}

export function removeLoginLocalStorage(): void {
  throwClientError();

  window.localStorage.removeItem(
    process.env.NEXT_PUBLIC_MY_LOGIN_USER as string,
  );
}
