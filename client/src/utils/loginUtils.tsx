'use-client';

import { error } from 'console';

export type saveLocalStorage = {
  userid: string;
  jwt: string;
};

function checkClient(): boolean {
  return typeof window === undefined;
}

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

export function getLoginLocalStorage(): saveLocalStorage {
  if (checkClient()) {
    notClientError();
  }

  let get: string | null | saveLocalStorage = localStorage.getItem(
    process.env.MY_LOGIN_USER as string,
  );

  if (get === null) {
    throw { error: 'getLoginLocalStorageError' };
  } else if (typeof get === 'string') {
    get = saveLocalStorageJsonParse(get) as saveLocalStorage;
  }

  return get;
}

export function setLoginLocalStorage(saveObj: saveLocalStorage): boolean {
  if (checkClient()) {
    notClientError();
  }
  const saveLocalStorage: string = saveLocalStorageJsonStringify(saveObj);
  localStorage.setItem(process.env.MY_LOGIN_USER as string, saveLocalStorage);
  return true;
}

export function saveLocalStorageJsonParse(jsonStr: string): saveLocalStorage {
  let jsonObj: saveLocalStorage | null = null;

  const obj = JSON.parse(jsonStr);

  saveLocalStorageCheck(obj);

  jsonObj = obj as saveLocalStorage;

  return jsonObj;
}

export function saveLocalStorageJsonStringify(
  jsonObj: saveLocalStorage,
): string {
  let jsonStr: string | null = null;

  saveLocalStorageCheck(jsonObj);

  jsonStr = JSON.stringify(jsonObj);

  return jsonStr;
}

export function saveLocalStorageCheck(obj: saveLocalStorage): void {
  const requiredKeys1: (keyof saveLocalStorage)[] = ['userid', 'jwt'];
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
