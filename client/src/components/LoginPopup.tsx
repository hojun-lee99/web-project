import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { initUserData } from '@/redux/loginStateSlice';
import { backend, fakeBackend, UserFormData } from '@/api/axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginServiceImpl } from '@/service/LoginService';

interface LoginPopupProps {
  type: 'login' | 'signup';
  onClose: () => void;
}

export default function LoginPopup({
  type: initialType,
  onClose,
}: LoginPopupProps) {
  const [type, setType] = useState<'login' | 'signup' | 'signupOk'>(
    initialType,
  );
  const [isSubmtting, setIsSubmtting] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    setError: setErrorLogin,
    formState: { errors: errorsLogin },
  } = useForm<UserFormData>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    setError: setErrorSignup,
    formState: { errors: errorsSigup },
  } = useForm<UserFormData>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const onSubmitLogin: SubmitHandler<UserFormData> = async (data, e) => {
    if (isSubmtting) {
      e?.preventDefault();
      return;
    }
    setIsSubmtting(true);
    const response = await LoginServiceImpl.fakeLogin(data);
    if (response) {
      onClose();
    } else {
      setErrorLogin('root', { type: 'World', message: 'Hello World' });
    }
    dispatch(initUserData());
    setIsSubmtting(false);
  };

  const onSubmitSignup: SubmitHandler<UserFormData> = async (data, e) => {
    if (isSubmtting) {
      e?.preventDefault();
      return;
    }
    setIsSubmtting(true);
    const response = await LoginServiceImpl.fakeSingup(data);
    if (response) {
      setType(() => {
        return 'signupOk';
      });
      setTimeout(onClose, 1000);
      // onClose();
    } else {
      setErrorSignup('root', { type: 'World', message: 'Hello World' });
    }
    dispatch(initUserData());
    setIsSubmtting(false);
  };

  const namePattern = /^[a-zA-Z]+$/;
  const emailPattern =
    /^[a-zA-Z][a-zA-Z0-9._%+-]+@([a-zA-Z]+(-[a-zA-Z]+)*\.)+[a-zA-Z]{2,}$/;
  const passwordParttern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
  const nameErrorText = '이름형식';
  const emailErrorText = '이메일형식';
  const passwordErrorText =
    '소문자, 대문자, 특수문자(!@#$%^&*)를 사용한 8이상 12이하';
  return (
    <PopupWrapper onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <Login>
          {type !== 'signupOk' && <div className="login-title">MOVIEPEDIA</div>}

          {type === 'login' ? (
            <div>
              <div className="login-title_text">로그인</div>
              <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                {errorsLogin.email && (
                  <p className="error-text">{errorsLogin.email.message}</p>
                )}
                <label htmlFor="login-email">
                  <input
                    {...registerLogin('email', {
                      required: true,
                      pattern: {
                        value: emailPattern,
                        message: emailErrorText,
                      },
                    })}
                    id="login-email"
                    type="text"
                    placeholder="이메일"
                  />
                </label>

                {errorsLogin.password && (
                  <p className="error-text">{errorsLogin.password.message}</p>
                )}
                <label htmlFor="login-password">
                  <input
                    {...registerLogin('password', {
                      required: true,
                      pattern: {
                        value: passwordParttern,
                        message: passwordErrorText,
                      },
                    })}
                    id="login-password"
                    type="password"
                    placeholder="비밀번호"
                  />
                </label>

                {errorsLogin.root && (
                  <p className="error-text">{errorsLogin.root.message}</p>
                )}

                <button className="login-button">로그인</button>
              </form>
              <div className="login-sign-up">
                계정이 없으신가요?
                <button
                  type="button"
                  onClick={(e) => {
                    if (isSubmtting) {
                      e.preventDefault();
                      return;
                    }
                    setType('signup');
                  }}
                >
                  회원가입
                </button>
              </div>
            </div>
          ) : type === 'signup' ? (
            <div>
              <div className="login-title_text">회원가입</div>
              <form onSubmit={handleSubmitSignup(onSubmitSignup)}>
                {errorsSigup.name && (
                  <p className="error-text">{errorsSigup.name?.message}</p>
                )}
                <label htmlFor="signup-name">
                  <input
                    {...registerSignup('name', {
                      required: true,
                      pattern: {
                        value: namePattern,
                        message: nameErrorText,
                      },
                    })}
                    id="signup-name"
                    type="text"
                    placeholder="이름"
                  />
                </label>

                {errorsSigup.email && (
                  <p className="error-text">{errorsSigup.email?.message}</p>
                )}
                <label htmlFor="signup-email">
                  <input
                    {...registerSignup('email', {
                      required: true,
                      pattern: {
                        value: emailPattern,
                        message: emailErrorText,
                      },
                    })}
                    id="signup-email"
                    type="text"
                    placeholder="이메일"
                  />
                </label>

                {errorsSigup.password && (
                  <p className="error-text">{errorsSigup.password?.message}</p>
                )}
                <label htmlFor="signup-password">
                  <input
                    {...registerSignup('password', {
                      required: true,
                      pattern: {
                        value: passwordParttern,
                        message: passwordErrorText,
                      },
                    })}
                    id="signup-password"
                    type="password"
                    placeholder="비밀번호"
                  />
                </label>

                {errorsSigup.root && (
                  <p className="error-text">{errorsSigup.root?.message}</p>
                )}

                <button className="login-button">회원가입</button>
              </form>
              <div className="login-sign-up">
                이미 가입하셨나요?
                <button
                  type="button"
                  onClick={(e) => {
                    if (isSubmtting) {
                      e.preventDefault();
                      return;
                    }
                    setType('login');
                  }}
                >
                  로그인
                </button>
              </div>
            </div>
          ) : (
            <div className="login-title">OK</div>
          )}
          {type !== 'signupOk' && (
            <React.Fragment>
              <hr></hr>

              <SocialLogin>
                <button type="button" className="btn-naver">
                  <Image
                    src="/icon-naver.png"
                    alt="네이버 로고"
                    width={50}
                    height={50}
                  />
                </button>
                <button type="button" className="btn-github">
                  <Image
                    src="/icon-github.svg"
                    alt="깃허브 로고"
                    width={50}
                    height={50}
                  />
                </button>
                <button type="button" className="btn-kakao">
                  <Image
                    src="/icon-kakao.svg"
                    alt="카카오 로고"
                    width={30}
                    height={30}
                  />
                </button>
                <button type="button" className="btn-google">
                  <Image
                    src="/icon-google.svg"
                    alt="구글 로고"
                    width={30}
                    height={30}
                  />
                </button>
              </SocialLogin>
            </React.Fragment>
          )}
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

  .error-text {
    font-size: 12px;
    color: red;
  }

  .login-sign-up {
    text-align: center;
    margin-top: 20px;

    button {
      color: var(--color-primary-accent);
      background: none;
      border: none;
      margin-left: 10px;
      cursor: pointer;
    }
  }

  hr {
    position: relative;
    height: 1.5rem;
    border: none;
    margin: 30px 0;
    width: 100%;

    &::after {
      content: 'OR';
      color: var(--color-text-secondary);
      vertical-align: middle;
      background-color: var(--color-background-primary);
      padding: 0 14px;
      display: inline-block;
      position: relative;
      top: 0;
      left: 50%;
      transform: translate(-50%);
      font-size: 14px;
    }

    &::before {
      content: '';
      border-top: 1px solid var(--color-border-primary);
      width: 100%;
      position: absolute;
      top: 50%;
    }
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
    cursor: pointer;
  }

  .btn-kakao {
    background-color: #f7e317;
  }
`;
