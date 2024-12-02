'use client';

import styled from 'styled-components';

type TitleLgProps = {
  title: string; // title은 문자열 타입이어야 함
};

export default function TitleLg({ title }: TitleLgProps) {
  return <PageTitleLg>{title}</PageTitleLg>;
}

const PageTitleLg = styled.h2`
  font-size: 42px;
  padding: 12px 0 14px;
  line-height: 51px;
`;
