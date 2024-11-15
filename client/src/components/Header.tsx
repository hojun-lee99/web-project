'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDebounce } from '../hooks/useDebounce';

export default function Header() {
  const userID = 'dddddd';

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500); // 디바운스된 값 사용 (500ms)
  const router = useRouter();

  // 디바운스된 값이 변경될 때 URL 이동
  useEffect(() => {
    if (debouncedSearchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(debouncedSearchValue)}`);
    }
  }, [debouncedSearchValue, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <HeaderWrap>
      <HeaderInner>
        <nav>
          <Logo>
            <Link href="/">MOVIEPEDIA</Link>
          </Logo>
          <MenuList>
            <li>
              <Link href="/movies">영화</Link>
            </li>
            <li>
              <Link href="/series">시리즈</Link>
            </li>
            <li>
              <Link href="/books">책</Link>
            </li>
            <li>
              <Link href="/webtoons">웹툰</Link>
            </li>
          </MenuList>
        </nav>
        <User>
          <InputWrap>
            <input
              type="text"
              placeholder="콘텐츠, 인물, 컬렉션, 유저를 검색해보세요."
              value={searchValue}
              onChange={handleChange}
            />
          </InputWrap>
          <Evaluation>
            <Link href="/review">평가하기</Link>
          </Evaluation>
          <Link href={`/users/${userID}`}>
            <UserProfile></UserProfile>
          </Link>
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
