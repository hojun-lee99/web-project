'use client';

import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRating from '../../components/StarRating';
import ReviewPopup from '../../components/ReviewPopup';

export const movieFilter = {
  영화: ['HOT 트렌드', '주간 트렌드', '인기 영화', '최고 평점 영화'],
  장르: [
    '느와르',
    '히어로',
    '범죄',
    '드라마',
    '코미디',
    '로맨스/멜로',
    '스릴러',
    '로맨틱코미디',
    '가족',
  ],
};

const messages = [
  {
    min: 1,
    max: 3,
    text: '제가 취향을 알 수 있게, 15개 이상의 작품을 평가해주세요.',
  },
  { min: 4, max: 6, text: '평가만 하는 것도 나름 재미있지 않으세요?' },
  { min: 7, max: 9, text: '이제 조금씩 취향의 윤곽이 드러납니다.' },
  { min: 10, max: 12, text: '어떤 영화를 좋아하실지 조금씩 감이 와요' },
  { min: 13, max: 14, text: '이제 알듯 말듯 하네요. 조금만 더 평가해주세요!' },
  {
    min: 15,
    max: 19,
    text: '15개 달성! 평가를 더 하시면 추천이 더 정확해져요.',
  },
  { min: 20, max: Infinity, text: '더 평가하시기로 마음 먹었군요' },
];

export default function Review() {
  const [activeTab, setActiveTab] = useState('movie');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [randomMovies, setRandomMovies] = useState<any[]>([]);

  const [reviewCounts, setReviewCounts] = useState<Record<string, number>>({
    movie: 0,
    series: 0,
    book: 0,
    webtoon: 0,
  });

  const currentReviewCount = reviewCounts[activeTab];

  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const response = await axios.get('/movie/popular', {
          params: { language: 'ko-KR', page: 1 },
        });
        const movies = response.data.results;
        const shuffledMovies = movies.sort(() => 0.5 - Math.random());
        const selectedMovies = shuffledMovies.slice(0, 10);
        setRandomMovies(selectedMovies);
      } catch (error) {
        console.error('Error fetching random movies:', error);
      }
    };

    if (activeTab === 'movie') {
      fetchRandomMovies();
    }
  }, [activeTab]);

  const getCurrentMessage = () => {
    const messageObj = messages.find(
      (msg) => currentReviewCount >= msg.min && currentReviewCount <= msg.max,
    );
    return messageObj
      ? messageObj.text
      : '제가 취향을 알 수 있게, 15개 이상의 작품을 평가해주세요.';
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleRandomClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const getChoiceText = () => {
    switch (activeTab) {
      case 'movie':
        return '영화';
      case 'series':
        return '시리즈';
      case 'book':
        return '책';
      case 'webtoon':
        return '웹툰';
      default:
        return '선택';
    }
  };

  return (
    <div className="content">
      <div className="content-inner">
        <ReviewHeader>
          <p>{currentReviewCount}</p>
          <p>{getCurrentMessage()}</p>
        </ReviewHeader>
        <TabWrap>
          <Tabs>
            <Tab
              onClick={() => handleTabClick('movie')}
              isActive={activeTab === 'movie'}
            >
              영화
            </Tab>
            <Tab
              onClick={() => handleTabClick('series')}
              isActive={activeTab === 'series'}
            >
              시리즈
            </Tab>
            <Tab
              onClick={() => handleTabClick('book')}
              isActive={activeTab === 'book'}
            >
              책
            </Tab>
            <Tab
              onClick={() => handleTabClick('webtoon')}
              isActive={activeTab === 'webtoon'}
            >
              웹툰
            </Tab>
          </Tabs>
          <Choice>
            <div onClick={handleRandomClick}>랜덤 {getChoiceText()}</div>
            <span>평가하고 싶은 장르를 선택해 주세요.</span>
          </Choice>
          <TabContent>
            {activeTab === 'movie' && (
              <MovieList>
                {randomMovies.map((movie) => (
                  <li key={movie.id}>
                    <div className="poster">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div className="info">
                      <div>
                        <p className="info-name">{movie.title}</p>
                        <p className="info-text">
                          <span>
                            {new Date(movie.release_date).getFullYear()}
                          </span>
                          <span>{movie.original_language.toUpperCase()}</span>
                        </p>
                      </div>
                      <StarRating
                        fontSize="34px"
                        name={movie.id}
                        onRatingSelect={() =>
                          setReviewCounts((prev) => ({
                            ...prev,
                            [activeTab]: prev[activeTab] + 1,
                          }))
                        }
                      />
                    </div>
                  </li>
                ))}
              </MovieList>
            )}
            {activeTab === 'series' && (
              <p>시리즈에 대한 내용을 여기에 추가하세요.</p>
            )}
            {activeTab === 'book' && <p>책에 대한 내용을 여기에 추가하세요.</p>}
            {activeTab === 'webtoon' && (
              <p>웹툰에 대한 내용을 여기에 추가하세요.</p>
            )}
          </TabContent>
        </TabWrap>
        <ReviewPopup isOpen={isPopupOpen} onClose={handleClosePopup}>
          <p>{getChoiceText()}</p>
        </ReviewPopup>
      </div>
    </div>
  );
}

const ReviewHeader = styled.header`
  margin-bottom: 36px;

  p {
    text-align: center;
    color: var(--color-primary-accent);
  }

  p:nth-of-type(1) {
    font-size: 64px;
    font-weight: 600;
  }
`;

const Choice = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 20px;

  div {
    font-size: 20px;
    font-weight: 700;
    margin-right: 20px;
    cursor: pointer;

    &::before {
      content: '\\f0d7';
      font-family: 'FontAwesome';
      margin-right: 8px;
      display: inline-block;
    }
  }

  span {
    font-size: 14px;
    color: var(--color-text-tertiary);
  }
`;

const TabWrap = styled.div`
  width: 100%;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 36px;
`;

const Tab = styled.button<{ isActive: boolean }>`
  width: 120px;
  padding: 10px;
  border: none;
  font-size: 28px;
  background: var(--color-background-primary);
  color: ${({ isActive }) =>
    isActive ? 'var(--color-primary-accent)' : '#D2D2D3'};
  cursor: pointer;
  outline: none;
  border-bottom: ${({ isActive }) =>
    isActive ? '4px solid var(--color-primary-accent)' : '4px solid #D2D2D3'};
`;

const TabContent = styled.div`
  background: #fff;
  border-top: none;
`;

const MovieList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  li {
    display: flex;
  }

  .poster {
    width: 74px;
    height: 106px;
    background-color: var(--color-background-tertiary);
    border: 1px solid var(--color-border-primary);
    border-radius: 4px;
    margin-right: 10px;
    overflow: hidden;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .info-name {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .info-text {
    display: flex;
    gap: 6px;
    font-size: 12px;
  }
`;
