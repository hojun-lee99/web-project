'use-client';

export type saveLocalStorage = {
  userid: string;
  jwt: string;
};

function checkClient(): boolean {
  return typeof window === undefined;
}

export function checkLoginLocalStorage(): boolean {
  if (checkClient()) {
    throw { error: 'error' };
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
    throw { error: 'error' };
  }

  let get: string | null | saveLocalStorage = localStorage.getItem(
    process.env.MY_LOGIN_USER as string,
  );

  if (get === null) {
    throw { error: 'error' };
  } else if (typeof get === 'string') {
    get = saveLocalStorageJsonParse(get) as saveLocalStorage;
  }

  return get;
}

export function setLoginLocalStorage(saveObj: saveLocalStorage): boolean {
  if (checkClient()) {
    throw { error: 'error' };
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
  const keys: string[] = Object.keys(obj).filter(
    (key) => !(key in ({} as saveLocalStorage)),
  );
  if (keys.length !== 0) {
    throw { message: 'error' };
  }
}

export function removeLoginLocalStorage(): void {
  if (checkClient()) {
    throw { error: 'error' };
  }
  localStorage.removeItem(process.env.MY_LOGIN_USER as string);
}
