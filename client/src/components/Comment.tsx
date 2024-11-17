'use client';

import styled from 'styled-components';

export default function Comment() {
  return (
    <CommentWrap>
      <header>
        <p>
          코멘트<span>450+</span>
        </p>
        <a href="#">더보기</a>
      </header>
      <CommentList>
        <li className="comment-item">
          <div className="comment-user">
            <div>
              <div className="comment-photo"></div>
              <div className="comment-id">닉네임</div>
            </div>
            <div className="comment-rating">4.0</div>
          </div>
          <div className="comment-text">짧을때</div>
        </li>
        <li className="comment-item">
          <div className="comment-user">
            <div>
              <div className="comment-photo"></div>
              <div className="comment-id">닉네임</div>
            </div>
            <div className="comment-rating">4.0</div>
          </div>
          <div className="comment-text">예시 데이터</div>
        </li>
        <li className="comment-item">
          <div className="comment-user">
            <div>
              <div className="comment-photo"></div>
              <div className="comment-id">닉네임</div>
            </div>
            <div className="comment-rating">4.0</div>
          </div>
          <div className="comment-text">
            억지 글래디에이터 감성 주입에 잔인한 액션 추가 영화 글래디에이터 2는
            전쟁영화의 거장으로 불리는 리들리스콧 감독의 역작으로, 그의 작품깨나
            봤다
          </div>
        </li>
        <li className="comment-item">
          <div className="comment-user">
            <div>
              <div className="comment-photo"></div>
              <div className="comment-id">닉네임</div>
            </div>
            <div className="comment-rating">4.0</div>
          </div>
          <div className="comment-text">
            억지 글래디에이터 감성 주입에 잔인한 액션 추가 영화 글래디에이터 2는
            전쟁영화의 거장으로 불리는 리들리스콧 감독의 역작으로, 그의 작품깨나
            봤다 싶은 관객들은 이번에도 황홀스러운 전쟁씬과 전작과 상응하는
            재미의 기대를 걸고 극장에 재미의 기대를 걸고 극장에 기대를 걸고
            극장에
          </div>
        </li>
      </CommentList>
    </CommentWrap>
  );
}

const CommentWrap = styled.div`
  header {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    align-items: center;

    p {
      display: flex;
      font-size: 24px;
      align-items: center;
      font-weight: 600;

      span {
        display: inline-block;
        margin-left: 8px;
        line-height: 20px;
        font-size: 15px;
        font-weight: 400;
        color: var(--color-primary-accent);
      }
    }

    a {
      font-size: 14px;
      color: var(--color-primary-accent);
    }
  }
`;

const CommentList = styled.ul`
  width: 100%;
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  .comment-item {
    width: calc(25% - (60px / 4));
    background-color: var(--color-background-secondary);
    padding: 10px;
    border-radius: 6px;
  }

  .comment-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--color-border-primary);

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .comment-rating {
    background-color: var(--color-background-primary);
    padding: 2px 6px;
    display: block;
    border-radius: 6px;

    &::before {
      content: '\\f005';
      font-family: 'FontAwesome';
      margin-right: 4px;
      color: var(--color-primary-accent);
    }
  }

  .comment-photo {
    width: 32px;
    height: 32px;
    background-color: #ddd;
    border-radius: 50%;
    margin-right: 12px;
  }

  .comment-text {
    padding-top: 10px;
    font-size: 15px;
    color: #5e5e64;
    height: 140px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
`;
