'use client';

import { useLoginFilter } from '@/hooks/useLoginFilter';
import { useAppDispatch } from '@/redux/hooks';
import { setLoginPopupState } from '@/redux/loginPopupStateSlice';
import React from 'react';

export default function LoginFilter({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const onLogin = useLoginFilter();
  return (
    <React.Fragment>
      <div
        onClickCapture={(e) => {
          if (!onLogin) {
            dispatch(setLoginPopupState('login'));
            e.stopPropagation();
          }
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
}
