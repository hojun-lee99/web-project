'use client';

import styled from 'styled-components';
import React, { useState } from 'react';
import Comment from './Comment';

interface CommentItem {
  id: string; // 유저 닉네임
  rating: number; // 평점
  text: string; // 코멘트 내용
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'view' | 'writer'; // UI타입
  movieTitle?: string; // 영화 제목
  commentData?: CommentItem[];
}

export default function CommentPopup({
  isOpen,
  onClose,
  type,
  movieTitle,
  commentData,
}: PopupProps) {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <PopupWrapper>
      {type === 'writer' && (
        <PopupContent>
          <PopupHeader>
            <p>{movieTitle || '영화 제목 없음'}</p>
            <button onClick={onClose}>X</button>
          </PopupHeader>
          <PopupInner isView={false}>
            {/* writer 상태 */}
            <Textarea>
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="이 작품에 대한 생각을 자유롭게 표현해 주세요."
              ></textarea>
            </Textarea>
            <div className="save">
              <p>
                <span>{text.length}</span>/<span>10000</span>
              </p>
              <button type="button">저장</button>
            </div>
          </PopupInner>
        </PopupContent>
      )}
      {type === 'view' && (
        <PopupContent>
          <PopupHeader>
            <p>코멘트</p>
            <button onClick={onClose}>X</button>
          </PopupHeader>
          <PopupInner isView={true}>
            {/* view 상태 */}
            {commentData && commentData.length > 0 ? (
              <Comment content={commentData} isPopup={true} /> // Comment 컴포넌트 사용
            ) : (
              <p>코멘트가 없습니다.</p>
            )}
          </PopupInner>
        </PopupContent>
      )}
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
  width: 820px;
  height: 700px;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 36px;

  p {
    font-size: 32px;
    font-weight: 600;
  }

  button {
    width: 40px;
    height: 40px;
    border: none;
    background: var(--color-background-tertiary);
    color: var(--color-text-primary);
    cursor: pointer;
    border-radius: 4px;
    font-weight: 500;
    font-size: 20px;
  }
`;

const PopupInner = styled.div<{ isView: boolean }>`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: ${({ isView }) => (isView ? 'auto' : 'initial')};
  padding-right: ${({ isView }) => (isView ? '10px' : '0')};

  button {
    padding: 10px;
    border: none;
    color: var(--color-text-white);
    background-color: var(--color-primary-accent);
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    width: 100px;
    margin-left: 10px;
  }

  .save {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  textarea {
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
  }
`;

const Textarea = styled.div`
  width: 100%;
  flex: 1;
`;
