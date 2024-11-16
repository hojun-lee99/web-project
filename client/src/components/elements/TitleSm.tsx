'use client';

import styled from 'styled-components';

export default function TitleSm() {
  return (
    <PageTitleSm>페이지 서브 제목</PageTitleSm>
  );
}

const PageTitleSm = styled.h3`
  font-size:20px;
  padding:12px 0 14px;
  line-height:24px;
`;