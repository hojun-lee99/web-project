import { Provider } from 'src/auth/auth.types';

export interface UserInfo {
  readonly id: string;
  readonly email: string;
  readonly password: string | null;
  readonly name: string;
  readonly provider: Provider;
}
export interface UserPrototype {
  readonly email: string;

  readonly name: string;

  readonly password: string;

  readonly provider: Provider;
}
