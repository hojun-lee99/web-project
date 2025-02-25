'use client';

export function checkClient(): boolean {
  return typeof window === undefined;
}

export function notClientError() {
  throw { error: 'not client' };
}

export function throwClientError() {
  if (checkClient()) {
    notClientError();
  }
}
