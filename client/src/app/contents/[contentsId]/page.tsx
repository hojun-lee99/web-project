'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Comment from '../../../components/Comment';
import PeopleInfo from '../../../components/PeopleInfo';
import StarRating from '../../../components/StarRating';
import GallerySlider from '../../../components/GallerySlider';
import axios from '../../../api/axios';

/* tmdb 기준 작업 다른 api쓸 경우 수정 필요*/

export default function Contents() {
  const [movie, setMovie] = useState<{ [key: string]: any } | null>(null);

  const category = 'movies';
  const movieId = 550; // 영화 클릭했을 때 id 값 받아서 쓰는걸로 수정 useRouter 서버컴포넌트에서 사용안함

  useEffect(() => {
    fetchData(movieId);
  }, []);

  const fetchData = async (id: string | number) => {
    try {
      const { data: movieDetail } = await axios.get(`movie/${id}`, {
        params: { append_to_response: 'videos,release_dates' },
      });
      setMovie(movieDetail);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  // 연령 등급 처리 로직
  const getAgeRating = () => {
    if (movie.release_dates && movie.release_dates.results) {
      const krRelease = movie.release_dates.results.find(
        (item: {
          iso_3166_1: string;
          release_dates: { certification: string }[];
        }) => item.iso_3166_1 === 'KR',
      );
      if (krRelease && krRelease.release_dates.length > 0) {
        return krRelease.release_dates[0].certification + '세' || '등급 없음';
      }
    }
    return '등급 없음';
  };

  return (
    <div className="content">
      <StillCut
        $backgroundImage={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
      >
        <div className="stillcut-inner">
          <ContentInfo>
            <p className="content-title">{movie.title}</p>
            <p className="content-small-title">{movie.original_title}</p>
            <p>
              <span className="content-year">
                {movie.release_date ? movie.release_date.split('-')[0] : '년도'}
              </span>
              <span className="content-genre">
                {movie.genres && movie.genres.length > 0
                  ? movie.genres
                      .map((genre: { id: number; name: string }) => genre.name)
                      .join(', ')
                  : '장르'}
              </span>
              <span className="content-country">
                {movie.origin_country && movie.origin_country.length > 0
                  ? movie.origin_country.join(', ')
                  : '국가 없음'}
              </span>
            </p>
            <p>
              <span className="content-runtime">
                {movie.runtime
                  ? `${Math.floor(movie.runtime / 60)}시간 ${
                      movie.runtime % 60
                    }분`
                  : '러닝타임'}
              </span>
              <span className="content-rating">{getAgeRating()}</span>
            </p>
          </ContentInfo>
        </div>
      </StillCut>
      <div className="content-inner">
        <ContentInfo2>
          <div className="content-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div className="content-rating">
              <StarRating />
              <p className="content-rating_value">
                <span>
                  {movie.vote_average
                    ? (movie.vote_average / 2).toFixed(1)
                    : 'N/A'}
                </span>
                <span>평균 별점</span>
              </p>
            </div>
            <div className="content-comment">
              <div>
                이 작품에 대한 <span>닉네임</span>님의 평가를 글로 남겨보세요.
              </div>
              <button>코멘트 남기기</button>
            </div>
            <div className="content-description">{movie.overview}</div>
          </div>
        </ContentInfo2>
        <PeopleInfo data={{ category, movieId }} />
        <CommentWrap>
          <Comment />
        </CommentWrap>

        <SliderWrap>
          <header>
            <p>스틸컷</p>
          </header>
          <GallerySlider data={{ movieId, type: 'image' }} />
        </SliderWrap>

        <SliderWrap>
          <header>
            <p>동영상</p>
          </header>
          <GallerySlider data={{ movieId, type: 'video' }} />
        </SliderWrap>
      </div>
    </div>
  );
}

const StillCut = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 550px;
  background: ${({ $backgroundImage }) =>
    $backgroundImage
      ? `url(${$backgroundImage}) center/cover no-repeat`
      : '#eee'};

  .stillcut-inner {
    position: relative;
    width: 100%;
    max-width: 1320px;
    height: 100%;
    margin: 0 auto;
    color: #fff;
  }
`;

const ContentInfo = styled.div`
  position: absolute;
  left: 0;
  bottom: 60px;

  p {
    font-size: 14px;
    margin-top: 16px;
  }
  span {
    position: relative;
    display: inline-block;

    &:not(:last-child)::after {
      content: '·';
      font-size: 14px;
      position: relative;
      top: 1px;
      padding: 0 4px;
      font-weight: 600;
    }
  }
  .content-title {
    font-size: 36px;
    margin-bottom: 16px;
    font-weight: 600;
  }
`;

const ContentInfo2 = styled.section`
  width: 100%;
  margin-top: 36px;
  display: flex;
  gap: 36px;

  > div:nth-of-type(2) {
    flex: 1;
  }

  .content-poster {
    width: 280px;
    height: 400px;
    background-color: var(--color-background-secondary);
  }

  .content-rating {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--color-border-primary);
  }

  .content-rating_value {
    display: flex;
    flex-direction: column;
    align-items: center;

    & span:nth-of-type(1) {
      font-size: 36px;
    }

    & span:nth-of-type(2) {
      font-size: 14px;
      color: var(--color-text-tertiary);
    }
  }

  .content-comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;

    button {
      padding: 10px;
      border: none;
      color: var(--color-text-white);
      background-color: var(--color-primary-accent);
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .content-description {
    padding-top: 20px;
    border-top: 1px solid var(--color-border-primary);
  }
`;

const CommentWrap = styled.section`
  width: 100%;
  margin-top: 60px;
`;

const SliderWrap = styled.section`
  width: 100%;
  margin-top: 60px;

  header {
    margin-bottom: 20px;

    p {
      font-size: 24px;
      font-weight: 600;
    }
  }
`;
