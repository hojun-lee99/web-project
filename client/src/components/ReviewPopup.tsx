'use client';
import React from 'react';
import styled from 'styled-components';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface CategoryContent {
  [key: string]: string[];
}

const categoryData: Record<string, CategoryContent> = {
  movie: {
    영화: ['랜덤 영화', '평균별점 TOP 영화', '전문가 고평점 영화'],
    장르: ['느와르', '히어로', '범죄', '드라마', '코미디', '로맨스', '스릴러'],
  },
  series: {
    시리즈: ['랜덤 시리즈', 'TV 애니메이션', '한국 시리즈', '미국 시리즈'],
    한국: ['지상파', '케이블'],
    외국: ['판타지/호러/미스테리', '하이틴', '시대극'],
  },
  book: {
    책: ['랜덤 책', '가장 많이 평가된 책', '누구나 알만한 책'],
    카테고리: ['에세이', '경영', '인문학'],
  },
  webtoon: {
    웹툰: ['랜덤 웹툰'],
    플랫폼: ['네이버 웹툰', '카카오 웹툰', '카카오 페이지'],
    장르: ['드라마', '무협', '스릴러'],
  },
};

export default function ReviewPopup({ isOpen, onClose, children }: PopupProps) {
  if (!isOpen) return null;

  let reviewCategory = '';
  if (typeof children === 'string') {
    reviewCategory = children;
  } else if (
    React.isValidElement(children) &&
    typeof children.props.children === 'string'
  ) {
    reviewCategory = children.props.children;
  }

  // reviewCategory에 따라 데이터 가져오기
  const categoryContent =
    categoryData[reviewCategory as keyof typeof categoryData];

  return (
    <PopupWrapper>
      <PopupContent>
        <PopupHeader>
          <p>
            {(() => {
              const choice = reviewCategory;
              if (choice === 'movie') return '영화';
              if (choice === 'series') return '시리즈';
              if (choice === 'book') return '책';
              if (choice === 'webtoon') return '웹툰';
            })()}
          </p>
          <button onClick={onClose}>X</button>
        </PopupHeader>
        <PopupInner>
          {categoryContent
            ? Object.keys(categoryContent).map((key) => (
                <ChoiceWrap key={key}>
                  <p className="category-text">{key}</p>
                  <ul>
                    {categoryContent[key]?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </ChoiceWrap>
              ))
            : '기본 내용입니다.'}
        </PopupInner>
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

const PopupInner = styled.div`
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 10px;
  }
  li {
    font-size: 16px;
    margin-bottom: 5px;
  }
`;

const ChoiceWrap = styled.div`
  .category-text {
    font-size: 14px;
    color: var(--color-text-tertiary);
    margin-bottom: 10px;
  }

  ul {
    margin-bottom: 40px;
  }
`;
