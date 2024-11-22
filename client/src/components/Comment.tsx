'use client';

import styled from 'styled-components';

interface CommentItem {
  id: string; // 유저 닉네임
  rating: number; // 평점
  text: string; // 코멘트 내용
}

interface CommentProps {
  content: CommentItem[]; // 코멘트 데이터 배열
  isPopup?: boolean; // 팝업 상태 여부
}

export default function Comment({ content, isPopup = false }: CommentProps) {
  return (
    <CommentWrap isPopup={isPopup}>
      <CommentList isPopup={isPopup}>
        {content.map((item, index) => (
          <li className="comment-item" key={index}>
            <div className="comment-user">
              <div>
                <div className="comment-photo"></div>
                <div className="comment-id">{item.id}</div>
              </div>
              <div className="comment-rating">{item.rating.toFixed(1)}</div>
            </div>
            <div className="comment-text">{item.text}</div>
          </li>
        ))}
      </CommentList>
    </CommentWrap>
  );
}

const CommentWrap = styled.div<{ isPopup: boolean }>`
  width: 100%;
  height: ${({ isPopup }) => (isPopup ? '100%' : 'auto')};
`;

const CommentList = styled.ul<{ isPopup: boolean }>`
  width: 100%;
  width: 100%;
  display: flex;
  flex-direction: ${({ isPopup }) => (isPopup ? 'column' : 'row')};
  gap: 20px;
  flex-wrap: wrap;

  .comment-item {
    width: ${({ isPopup }) => (isPopup ? '100%' : 'calc(25% - (60px / 4))')};
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
    height: ${({ isPopup }) => (isPopup ? 'auto' : '138px')};
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
`;
