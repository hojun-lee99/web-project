'use client';

import { useState } from 'react';
import styled from 'styled-components';

type MenuProps = {
  menu: string[];
};

export default function TitleTab({ menu }: MenuProps) {
  const [activeIndex, setActiveIndex] = useState(0); // 활성화된 탭의 인덱스 관리

  const handleTabClick = (index: number) => {
    setActiveIndex(index); // 클릭된 탭의 인덱스로 설정
  };

  return (
    <PageTitleTabWrap>
      {menu.map((tabE, index) => (
        <PageTitleTab
          key={index}
          onClick={() => handleTabClick(index)}
          className={activeIndex === index ? 'act' : ''}
        >
          {tabE}
        </PageTitleTab>
      ))}
    </PageTitleTabWrap>
  );
}

const PageTitleTabWrap = styled.ul`
  display: flex;
  height: 40px;
  margin-bottom: 24px;
`;

const PageTitleTab = styled.li`
  margin-right: 8px;
  padding: 0 16px;
  font-size: 14px;
  line-height: 40px;
  border: 1px solid #e0e0e0;
  color: #747474;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &.act {
    background-color: #141414;
    color: #fff;
  }
`;
