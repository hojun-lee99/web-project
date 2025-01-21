'use-client';

export type saveLocalStorage = {
  userid: string;
  jwt: string;
};

function checkClient(): boolean {
  return typeof window === undefined;
}

export function checkLoginLocalStorage(): boolean | void {
  if (checkClient()) {
    return;
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

export function getLoginLocalStorage(): {
  userid: string;
  jwt: string;
} | void | null {
  if (checkClient()) {
    return;
  }
  let get: string | null | saveLocalStorage = localStorage.getItem(
    process.env.MY_LOGIN_USER as string,
  );
  if (typeof get === 'string') {
    get = JSON.parse(get) as saveLocalStorage;
  }
  return get;
}

export function setLoginLocalStorage(
  saveLocalStorage: saveLocalStorage,
): boolean | void {
  if (checkClient()) {
    return;
  }
  JSON.parse;
}

export function saveLocalStorageJsonParse(
  jsonStr: string,
): saveLocalStorage | null {
  let jsonObj: saveLocalStorage | null = null;
  try {
    jsonObj = JSON.parse(jsonStr);
  } catch (error) {
    jsonObj = null;
    console.error(error);
  }

  return jsonObj;
}

export function jsonStringifysaveLocalStorageJsonStringify(
  jsonObj: saveLocalStorage,
): string | null {
  let jsonStr: string | null = null;

  if (saveLocalStorageCheck(jsonObj)) {
    jsonStr = JSON.stringify(jsonObj);
  }
  return jsonStr;
}

export function saveLocalStorageCheck(obj: saveLocalStorage): boolean {
  let check = false;
  const keys: string[] = Object.keys(obj).filter(
    (key) => !(key in ({} as saveLocalStorage)),
  );
  if (keys.length === 0) {
    check = true;
  }
  return check;
}

export function removeLoginLocalStorage(): void {
  if (checkClient()) {
    return;
  }
  localStorage.removeItem(process.env.MY_LOGIN_USER as string);
}
