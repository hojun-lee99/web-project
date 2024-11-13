'use client';

import styled from 'styled-components';

export default function Header() {
  return (
    <HeaderWrap>
      <HeaderInner>
        <nav>
          <Logo>MOVIEPEDIA</Logo>
          <MenuList>
            <li>영화</li>
            <li>시리즈</li>
            <li>책</li>
            <li>웹툰</li>
          </MenuList>
        </nav>
        <User>
          <InputWrap>
            <input
              type="text"
              placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해보세요."
            />
          </InputWrap>
          <Evaluation>평가하기</Evaluation>
          <UserProfile></UserProfile>
        </User>
      </HeaderInner>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.header`
  height: 86px;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid #e0e0e0;

  nav {
    display: flex;

    height: 100%;

    align-items: center;
  }
`;

const HeaderInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1320px;
  margin: 0 auto;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 32px;
`;

const MenuList = styled.ul`
  display: flex;
  gap: 40px;
  margin-left: 40px;

  li {
    color: var(--color-text-primary);
    font-size: 20px;
    opacity: 20%;
    font-weight: 600;
  }
`;

const InputWrap = styled.div`
  input {
    padding: 10px;
    font-size: 14px;
    color: var(--color-text-tertiary);
    background: var(--color-background-secondary);
    border-radius: 4px;
    border: none;
    width: 290px;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Evaluation = styled.div`
  margin: 0 20px;
`;

const UserProfile = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #d9d9d9;
`;
