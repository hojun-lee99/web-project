'use-client';

import { backend } from '@/api/axios';
export interface SaveLocalStorage {
  userID: string;
  onLogin: boolean;
}

function checkClient(): boolean {
  return typeof window === undefined;
}

export function requsetLogin() {}

function notClientError() {
  throw { error: 'not client' };
}

export function checkLoginLocalStorage(): boolean {
  if (checkClient()) {
    notClientError();
  }

  let ok: boolean = false;
  const check: string | null = localStorage.getItem(
    process.env.MY_LOGIN_USER as string,
  );

  if (check !== null) {
    ok = true;
  }

  return ok;
}

export function getLoginLocalStorage(): SaveLocalStorage {
  if (checkClient()) {
    notClientError();
  }

  let get: string | null | SaveLocalStorage = localStorage.getItem(
    process.env.MY_LOGIN_USER as string,
  );

  if (get === null) {
    throw { error: 'getLoginLocalStorageError' };
  } else if (typeof get === 'string') {
    get = saveLocalStorageJsonParse(get) as SaveLocalStorage;
  }

  return get;
}

export function setLoginLocalStorage(saveObj: SaveLocalStorage): boolean {
  if (checkClient()) {
    notClientError();
  }
  const SaveLocalStorage: string = saveLocalStorageJsonStringify(saveObj);
  localStorage.setItem(process.env.MY_LOGIN_USER as string, SaveLocalStorage);
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
  const requiredKeys1: (keyof SaveLocalStorage)[] = ['userID', 'onLogin'];
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
    throw { error: 'error' };
  }
}

export function removeLoginLocalStorage(): void {
  if (checkClient()) {
    notClientError();
  }
  localStorage.removeItem(process.env.MY_LOGIN_USER as string);
}
