'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectLoginState } from '@/redux/loginStateSlice';

export const useUserJwt = () => {
  const userJwt = useAppSelector(selectLoginState).jwt;
  return userJwt;
};
