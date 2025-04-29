'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDebounce } from '../hooks/useDebounce';

import LoginPopup from '../components/LoginPopup';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectLoginState, initUserData } from '@/redux/loginStateSlice';
import { LoginServiceImpl } from '@/service/LoginService';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const router = useRouter();

  //알람
  const [hasAlarm] = useState(false); //setHasAlarm
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  //로그인
  const [popupState, setPopupState] = useState<'login' | 'signup' | null>(null);

  const loginState = useAppSelector(selectLoginState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initUserData());
  }, []);

  const logout = async (): Promise<void> => {
    await LoginServiceImpl.logout();
    dispatch(initUserData());
  };

  const openPopup = (state: 'login' | 'signup') => {
    setPopupState(state);
  };

  const closePopup = () => {
    setPopupState(null);
  };

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
              <Link href="/community">커뮤니티</Link>
            </li>
            <li
              onClick={async () => {
                await LoginServiceImpl.refreshJWT();
                dispatch(initUserData());
              }}
            >
              refresh
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

          {/* {isLoggedIn ? ( */}
          {loginState.onLogin ? (
            <>
              {/* 로그인 상태일 때 */}
              <Evaluation>
                <Link href="/review">평가하기</Link>
              </Evaluation>
              <Alarm hasAlarm={hasAlarm}>
                <button onClick={toggleVisibility}>
                  <i className="fa fa-bell"></i>
                </button>
                {isVisible && (
                  <>
                    {hasAlarm ? (
                      <ul className="alarm-list">
                        <li>보고싶어하신 ㅇㅇㅇ인 새로 등록되었어요.</li>
                        <li>글제목에 댓글이 달렸습니다.</li>
                        <li>글제목에 댓글이 달렸습니다.</li>
                      </ul>
                    ) : (
                      <div className="alarm-list">등록된 알람이 없습니다.</div>
                    )}
                  </>
                )}
              </Alarm>
              <Link href={`/users`}>
                <UserProfile />
              </Link>
              <div
                onClick={async () => {
                  await logout();
                }}
              >
                logout
              </div>
            </>
          ) : (
            <>
              {/* 비로그인 상태일 때 */}
              <LoginButtons>
                <button onClick={() => openPopup('login')}>로그인</button>
                <button onClick={() => openPopup('signup')}>회원가입</button>
              </LoginButtons>
            </>
          )}
        </User>
      </HeaderInner>

      {/* 팝업 렌더링 */}
      {popupState && <LoginPopup type={popupState} onClose={closePopup} />}
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
  gap: 28px;
  margin-left: 28px;

  li {
    color: var(--color-text-primary);
    font-size: 18px;
    opacity: 20%;
    font-weight: 600;
  }
`;

const InputWrap = styled.div`
  input {
    padding: 10px;
    font-size: 13px;
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

  a {
    font-size: 15px;
  }
`;

const UserProfile = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #d9d9d9;
`;

const Alarm = styled.div<{ hasAlarm: boolean }>`
  position: relative;

  button {
    border: none;
    cursor: pointer;
    margin-right: 20px;
    background: none;
    position: relative;

    i::after {
      content: '';
      position: absolute;
      top: -4px;
      right: -4px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${({ hasAlarm }) =>
        hasAlarm ? 'var(--color-primary-accent)' : 'transparent'};
      border: ${({ hasAlarm }) => (hasAlarm ? '2px solid #fff' : 'none')};
    }
  }

  .alarm-list {
    display: ${({ hasAlarm }) => (hasAlarm ? 'block' : 'true')};
    position: absolute;
    top: 35px;
    left: -190px;
    z-index: 100;
    background-color: #fff;
    width: 270px;
    padding: 10px;
    font-size: 14px;
    border-radius: 6px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-border-primary);
  }

  div.alarm-list {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }

  ul.alarm-list {
    height: fit-content;
    max-height: 170px;
    overflow: auto;

    li {
      padding: 6px 0;
      border-bottom: 1px solid var(--color-border-primary);
      color: var(--color-text-tertiary);
    }
  }
`;

const LoginButtons = styled.div`
  button {
    background: none;
    border: none;
    margin-left: 20px;
    color: var(--color-text-secondary);
    font-weight: 500;
    cursor: pointer;
  }

  button:last-of-type {
    border: 1px solid var(--color-border-primary);
    padding: 6px 8px;
    border-radius: 4px;
  }
`;
