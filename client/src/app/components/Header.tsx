'use client';

import styled from 'styled-components';

export default function Header() {
  return (
    <MenuWrap>
      <nav>
        <Logo>MOVIEPEDIA</Logo>
        <MenuList>
          <li>영화</li>
          <li>시리즈</li>
          <li>책</li>
          <li>웹툰</li>
        </MenuList>
      </nav>
    </MenuWrap>
  );
}

const MenuWrap = styled.header`
  height: 86px;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid #e0e0e0;

  nav {
    display: flex;
    width: 100%;
    height: 100%;
    max-width: 1350px;
    margin: 0 auto;
    align-items: center;
  }
`;

const Logo = styled.h1`
  font-size: 32px;
`;

const MenuList = styled.ul`
  display: flex;
  gap: 40px;
  margin-left: 40px;

  li {
    font-size: 20px;
    opacity: 20%;
    font-weight: 600;
  }
`;
