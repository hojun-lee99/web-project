'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../api/axios';

type TitleProps = {
  cate: string;
};

export default function CardDefault({ cate }: TitleProps) {
  const category = cate;
  const [loadMovies, setLoadMovies] = useState<any[]>([]);

  // 영화 데이터를 가져오는 함수
  const fetchMovies = async (movieCate: string) => {
    try {
      const response = await axios.get('/movie/' + movieCate, {
        params: { language: 'ko-KR', page: 1 },
      });
      const movies = response.data.results;
      setLoadMovies(movies);
      console.log(movieCate + ':')
      console.log(movies)
    } catch (error) {
      console.error('Error fetching random movies:', error);
    }
  };

  // useEffect를 사용해 데이터 로드
  useEffect(() => {
    if (category === 'HOTRank') {
      fetchMovies('popular');
    } else if (category === 'Dday') {
      fetchMovies('upcoming');
    }
  }, []);

  return (
    <CardListWrap>
      {/* HOTRank 카테고리 */}
      {cate === 'HOTRank' && (
        <>
          {loadMovies.slice(0, 5).map((movie, index) => (
            <CardWrap key={movie.id}>
              <div className="card-photo">
                <div className="card-PhotoTxt">{index + 1}</div>
                <div className="card-logo"></div>
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
              <div className='card-text-wrap'>
                <div className="card-movie-title">{movie.title}</div>
                <div className="card-movie-desc">{new Date(movie.release_date).getFullYear()} | {movie.original_language.toUpperCase()}</div>
              </div>
            </CardWrap>
          ))}
        </>
      )}

      {/* Dday 카테고리 */}
      {cate === 'Dday' && (
        <>
          {loadMovies.slice(0, 5).map((movie, index) => (
            <CardWrap key={movie.id}>
              <div className="card-photo">
                <div className="card-PhotoTxt">D-1</div>
                <div className="card-logo"></div>
                <div className="card-WTS">
                  + 보고싶어요 <span className="cardWTSScr">000</span>
                </div>
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
              <div className="card-text-wrap">
                <div className="card-movie-title">{movie.title}</div>
                <div className="card-movie-desc">
                  {new Date(movie.release_date).getFullYear()} | {movie.original_language.toUpperCase()} <span className="card-movie-viewCnt">예매율 및 관객수</span>
                </div>
              </div>
            </CardWrap>
          ))}
        </>
      )}

    </CardListWrap>
  );
}

// 스타일 정의
const CardListWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const CardWrap = styled.div`
  width: 100%;
  max-width: 248px;
  height: auto;
  max-height: 423px;

  .card-photo {
    height: 355px;
    border-radius: 4px;
    overflow: hidden;
    padding: 10px;
    position: relative;
    z-index:1;

    img{
      position:absolute;
      left:0;
      top:0;
      z-index:-1;
    }

    .card-PhotoTxt {
      background-color: #101113;
      color: #fff;
      padding: 3px 6px;
      border-radius: 4px;
      position: absolute;
      top: 10px;
      left: 10px;
    }

    .card-logo {
      background-color: #fff;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .card-WTS {
      background-color: #101113;
      color: #fff;
      width: 100%;
      padding: 10px;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .cardWTSScr {
      float: right;
    }
  }

  .card-text-wrap {
    padding: 10px 0;

    .card-movie-title {
      font-size: 16px;
      font-weight: 500;
      line-height: 22px;
    }

    .card-movie-desc {
      font-size: 14px;
      color: #555;
    }

    .card-movie-viewCnt {
      font-size: 13px;
      color: #00b9ae;
    }
  }
`;


