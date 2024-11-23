import styled from 'styled-components';
import { useState } from 'react';

interface LoginPopupProps {
  type: 'login' | 'signup';
  onClose: () => void;
}

export default function LoginPopup({
  type: initialType,
  onClose,
}: LoginPopupProps) {
  const [type, setType] = useState<'login' | 'signup'>(initialType);

  return (
    <PopupWrapper onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <Login>
          <div className="login-title">MOVIEPEDIA</div>

          {type === 'login' ? (
            <div>
              <div className="login-title_text">로그인</div>
              <form>
                <label htmlFor="login-email">
                  <input id="login-email" type="text" placeholder="이메일" />
                </label>

                <label htmlFor="login-password">
                  <input
                    id="login-password"
                    type="password"
                    placeholder="비밀번호"
                  />
                </label>

                <button className="login-button">로그인</button>
              </form>
              <div className="login-sign-up">
                계정이 없으신가요?
                <button type="button" onClick={() => setType('signup')}>
                  회원가입
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="login-title_text">회원가입</div>
              <form>
                <label htmlFor="signup-name">
                  <input id="signup-name" type="text" placeholder="이름" />
                </label>

                <label htmlFor="signup-email">
                  <input id="signup-email" type="email" placeholder="이메일" />
                </label>

                <label htmlFor="signup-password">
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="비밀번호"
                  />
                </label>

                <button className="login-button">회원가입</button>
              </form>
              <div className="login-sign-up">
                이미 가입하셨나요?
                <button type="button" onClick={() => setType('login')}>
                  로그인
                </button>
              </div>
            </div>
          )}

          <hr></hr>

          <SocialLogin>
            <button type="button" className="btn-naver">
              네이버
            </button>
            <button type="button" className="btn-github">
              깃허브
            </button>
            <button type="button" className="btn-kakao">
              카카오
            </button>
            <button type="button" className="btn-google">
              구글
            </button>
          </SocialLogin>
        </Login>
      </PopupContent>
    </PopupWrapper>
  );
}

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 36px;
  border-radius: 8px;
  width: 375px;
  height: fit-content;
`;

const Login = styled.div`
  .login-title {
    font-size: 32px;
    font-weight: 700;
    width: 100%;
    text-align: center;
  }

  .login-title_text {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    width: 100%;
    background: var(--color-background-secondary);
    border: none;
    border-radius: 4px;
    padding: 15px 10px;
    margin-bottom: 10px;
  }

  .login-button {
    border: none;
    background: var(--color-primary-accent);
    color: #fff;
    width: 100%;
    border-radius: 4px;
    padding: 10px;
    margin-top: 10px;
  }

  .login-sign-up {
    text-align: center;
    margin-top: 20px;

    button {
      color: var(--color-primary-accent);
      background: none;
      border: none;
      margin-left: 10px;
    }
  }
  hr {
    background-color: var(--color-border-primary);
    height: 1px;
    border: none;
    margin: 20px 0;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;

  button {
    width: 50px;
    height: 50px;
    border: 1px solid var(--color-border-primary);
    background: none;
    border-radius: 50%;
  }
`;
