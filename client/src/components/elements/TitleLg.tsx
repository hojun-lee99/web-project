'use client';

import styled from 'styled-components';

export default function TitleLg({ title }) {
  return (
    <PageTitleLg>{title}</PageTitleLg>
  );
}

const PageTitleLg = styled.h2`
  font-size:42px;
  padding:12px 0 14px;
  line-height:51px;
`;