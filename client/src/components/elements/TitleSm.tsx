'use client';

import styled from 'styled-components';
import '../../app/globals.css';
import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

type TitleProps = {
  title: string;
  viewMore: boolean; // viewMore을 TitleProps에 포함
  cate: string;
};

export default function TitleSm({ title, viewMore, cate }: TitleProps) {
  const router = useRouter();

  return (
    <PageTitleSm>
      {title}
      {viewMore && (
        <a
          onClick={(e) => {
            e.preventDefault();
            router.push(`/${cate}`);
          }}
        >
          더보기
        </a>
      )}
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
    color: var(--color-primary-accent);
    font-size: 15px;
    line-height: 20px;
    cursor: pointer;
  }
`;
