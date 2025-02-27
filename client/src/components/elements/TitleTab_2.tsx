'use client';

import styled from 'styled-components';

type MenuProps = {
  menu: string[][]; // menu는 문자열 배열로 정의
  selected: string;
  select(selcted: string): void;
};

export default function TitleTab_2({ menu, selected, select }: MenuProps) {
  return (
    <PageTitleTabWrap>
      {menu.map((e) =>
        e[1] !== selected ? (
          <PageTitleTab
            key={e[1]}
            onClick={() => {
              select(e[1]);
            }}
          >
            {e[0]}
          </PageTitleTab>
        ) : (
          <PageTitleTab2 key={e[1]}>{e[0]}</PageTitleTab2>
        ),
      )}
    </PageTitleTabWrap>
  );
}

const PageTitleTabWrap = styled.ul`
  display: flex;
  height: 43px;
  margin: 0 auto 36px;
  border-bottom: 1px solid #e0e0e0;
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
const PageTitleTab2 = styled(PageTitleTab)`
  color: #343434;
  font-weight: bold;
`;
