'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Comment from '../../../components/Comment';
import PeopleInfo from '../../../components/PeopleInfo';
import StarRating from '../../../components/StarRating';
import GallerySlider from '../../../components/GallerySlider';
import { fakeBackend } from '../../../api/axios';
import CommentPopup from '../../../components/CommentPopup';
import Image from 'next/image';
import { MovieDetail, MovieServiceImpl } from '@/service/MovieService';
import { useDebounce } from '@/hooks/useDebounce';
import LoginFilter from '@/components/auth/LoginFilter';

export default function Contents({
  params,
}: {
  params: { contentsId: string };
}) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<'view' | 'writer' | 'edit'>(
    'view',
  );
  const [commentData, setCommentData] = useState<
    { id: string; rating: number; text: string }[] | []
  >([]);
  const [myComment, setMyComment] = useState<string | undefined>(undefined);

  const [myRating, setMyiRating] = useState<number>(3); //임시 내가 평가한 별점이 있다면
  const fetchRating = useDebounce(myRating, 1000);

  const category = 'movies';
  const movieId = params.contentsId;

  useEffect(() => {
    fetchData(movieId);
    (async () => {
      setCommentData(await fakeBackend.getContentComment(movieId));
    })();
    (async () => {
      setMyComment(
        'hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world',
      );
    })();
  }, []);
  useEffect(() => {
    console.log(fetchRating);
  }, [fetchRating]);

  const fetchData = async (id: string | number) => {
    try {
      const { data: movieDetail } = await MovieServiceImpl.getMovieDetailData(
        id as string,
      );
      setMovie(movieDetail);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const openPopup = (type: 'view' | 'writer' | 'edit') => {
    console.log('Opening popup with type:', type); // 디버깅용
    setPopupType(type); // Popup 타입 업데이트
    setIsPopupOpen(true); // Popup 열기
  };

  const closePopup = () => {
    console.log('Closing popup'); // 디버깅용
    setIsPopupOpen(false); // Popup 닫기
  };

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
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              layout="fill"
              style={{
                objectFit: 'cover', // 이미지 비율 유지하며 채우기
                objectPosition: 'center', // 이미지 중앙 정렬
              }}
              sizes="(max-width: 768px) 33%, (max-width: 1320px) 24%, 33%"
            />
          </div>
          <div>
            <div className="content-rating">
              <StarRating
                name={movie.id}
                myRating={myRating}
                onRatingSelect={setMyiRating}
              />
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
              {myComment ? (
                <div className="content-comment_area">
                  {/* myReview가 true일 때 보여줄 내용 */}
                  <div>
                    <div className="content-comment_profile"></div>
                    <p>
                      {myComment.length < 90
                        ? myComment
                        : myComment.slice(0, 90) + '...'}
                    </p>
                  </div>
                  <div>
                    <button type="button" onClick={() => openPopup('writer')}>
                      수정
                    </button>
                    <button type="button">삭제</button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* myReview가 false일 때 보여줄 내용 */}
                  <div>
                    이 작품에 대한 <span>닉네임</span>님의 평가를 글로
                    남겨보세요.
                  </div>
                  {/* <LoginFilter> */}
                  <button type="button" onClick={() => openPopup('writer')}>
                    코멘트 남기기
                  </button>
                  {/* </LoginFilter> */}
                </div>
              )}
            </div>
            <div className="content-description">{movie.overview}</div>
          </div>
        </ContentInfo2>

        <PeopleInfo data={{ category, movieId }} />

        <CommentListWrap>
          <header>
            <p>
              코멘트<span>{commentData.length}+</span>
            </p>
            <button onClick={() => openPopup('view')}>더보기</button>
          </header>
          {/* 최대 8개만 전달 */}
          <Comment content={commentData.slice(0, 8)} />
        </CommentListWrap>

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

      {/* Popup 컴포넌트 표시 */}
      <CommentPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        type={popupType}
        movieTitle={popupType === 'writer' ? movie.title : undefined}
        commentData={popupType === 'view' ? commentData : undefined}
        myCommentData={popupType === 'writer' ? myComment : undefined}
      />
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
    position: relative;
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
    padding: 20px 10px;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

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

  .content-comment_area {
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .content-comment_profile {
      width: 56px;
      height: 56px;
      background-color: var(--color-background-tertiary);
      border-radius: 50%;
      margin-right: 20px;
    }

    button {
      background-color: #fff;
      color: var(--color-text-tertiary);
    }
  }

  .content-description {
    padding-top: 20px;
    border-top: 1px solid var(--color-border-primary);
  }
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

const CommentListWrap = styled.div`
  margin-top: 60px;
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

    button {
      font-size: 14px;
      color: var(--color-primary-accent);
      background: none;
      border: none;
      cursor: pointer;
    }
  }
`;
