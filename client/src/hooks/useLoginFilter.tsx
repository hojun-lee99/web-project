'use clicent';

import { useAppSelector } from '@/redux/hooks';
import { selectLoginState } from '@/redux/loginStateSlice';

export const useLoginFilter = () => {
  const onLogin = useAppSelector(selectLoginState).onLogin;
  return onLogin;
};
