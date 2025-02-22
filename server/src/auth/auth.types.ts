export interface LocalLoginPrototype {
  readonly email: string;

  readonly password: string;
}

export type Provider = 'LOCAL' | 'KAKAO';
