'use client';

import styled from 'styled-components';

type MenuProps = {
  menu: string[]; // menu는 문자열 배열로 정의
};

export default function TitleTab_2({ menu }: MenuProps) {
  return (
    <PageTitleTabWrap>
      {menu.map((e, index) => (
        <PageTitleTab key={index}>{e}</PageTitleTab>
      ))}
    </PageTitleTabWrap>
  );
}

const PageTitleTabWrap = styled.ul`
  display: flex;
  height: 43px;
  margin: 0 auto 36px;
  border-bottom: 1px solid #E0E0E0;
  max-width: 1320px;
`;

const PageTitleTab = styled.li`
  margin-right: 8px;
  display: inline-block;
  padding: 0 17.5px;
  font-size: 20px;
  line-height: 43px;
  color: #747474;
  cursor: pointer;

  &.active {
    position: relative;
    color: #141414;

    &:after {
      content: '';
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      background-color: #141414;
    }
  }
`;
