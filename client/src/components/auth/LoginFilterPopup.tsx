'use client';

import { useLoginFilter } from '@/hooks/useLoginFilter';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';

export default function LoginFilterPopup({
  children,
  message,
}: {
  children: React.ReactNode;
  message: string;
}) {
  const onLogin = useLoginFilter();
  const router = useRouter();
  console.log(onLogin);
  if (onLogin) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <PopupWrapper
      onClick={() => {
        router.back();
      }}
    >
      <PopupContent>{message}</PopupContent>
    </PopupWrapper>
  );
}

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 36px;
  border-radius: 8px;
  text-align: center;
  width: 375px;
  height: fit-content;
`;
