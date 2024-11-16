'use client';

import styled from 'styled-components';

export default function TitleMd() {
  return (
    <PageTitleMd>페이지 서브 제목</PageTitleMd>
  );
}

const PageTitleMd = styled.h3`
  font-size:29px;
  padding:12px 0 14px;
  line-height:29px;
`;