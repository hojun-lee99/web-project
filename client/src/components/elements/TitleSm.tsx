'use client';

import styled from 'styled-components';

type TitleProps = {
  title: string;
  viewMore: boolean; // viewMore을 TitleProps에 포함
};

export default function TitleSm({ title, viewMore }: TitleProps) {
  return (
    <PageTitleSm>
      {title}
      {viewMore && <a href="#">더보기</a>}
    </PageTitleSm>
  );
}

const PageTitleSm = styled.h3`
  font-size: 20px;
  padding: 12px 0 14px;
  line-height: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  a {
    color: #7e7e7e;
    font-size: 15px;
    line-height: 20px;
  }
`;