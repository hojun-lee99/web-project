'use client';

import styled from 'styled-components';

export default function TitleTab() {
  return (
    <PageTitleTabWrap>
      <PageTitleTabAct>메뉴명</PageTitleTabAct>
      <PageTitleTab>메뉴명</PageTitleTab>
    </PageTitleTabWrap>
  );
}

const PageTitleTabWrap = styled.ul`
  display:flex;
  height:40px;
  margin-bottom:24px;
`;
const PageTitleTab = styled.li`
  float:left;
  margin-right:8px;
  display:inline-block;
  padding:0 16px;
  font-size:14px;
  line-height:40px;
  border:1px solid #E0E0E0;
  color:#747474;
  border-radius:50px;
  cursor:pointer;
`
const PageTitleTabAct = styled.li`
  float:left;
  margin-right:8px;
  display:inline-block;
  padding:0 16px;
  font-size:14px;
  line-height:40px;
  background-color:#141414;
  color:#fff;
  border-radius:50px;
`