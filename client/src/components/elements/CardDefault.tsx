'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from '../../api/axios';
import { useRouter } from 'next/navigation';
import { openDetail } from '@/hooks/openDetail';
import Image from 'next/image';

type TitleProps = { cate: string };

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  original_language: string;
}

export default function CardDefault({ cate }: TitleProps) {
  const router = useRouter();
  const category = cate;
  const [loadMovies, setLoadMovies] = useState<Movie[]>([]);

  const fetchMovies = useCallback(async (movieCate: string) => {
    try {
      let response;
      if (movieCate == 'top_rated') {
        response = await axios.get('/movie/' + movieCate, {
          params: { language: 'ko-KR', page: 1 },
        });
      } else if (movieCate == 'Dday') {
        response = await axios.get('/movie/' + movieCate, {
          params: {
            language: 'ko-KR',
            page: 1,
            dates: { maximum: '2024-12-25', minimum: '2024-12-04' },
          },
        });
      } else if (movieCate == 'popular') {
        response = await axios.get('/movie/' + movieCate, {
          params: { language: 'ko-KR', page: 1 },
        });
      } else {
        response = await axios.get('/movie/' + movieCate, {
          params: { language: 'ko-KR', page: 1 },
        });
      }
      setLoadMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }, []);

  useEffect(() => {
    if (category === 'HOTRank') {
      fetchMovies('popular');
    } else if (category === 'Dday') {
      fetchMovies('upcoming');
    }
  }, [category, fetchMovies]);

  return (
    <CardListWrap>
      {/* HOTRank 카테고리 */}
      {cate === 'HOTRank' && (
        <>
          {loadMovies.slice(0, 5).map((movie, index) => (
            <CardWrap
              key={movie.id}
              onClick={() => openDetail(router, movie.id, 'movie')}
            >
              <div className="card-photo">
                <div className="card-PhotoTxt">{index + 1}</div>
                <div className="card-logo"></div>
                <div className="card-photo-wrap">
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    layout="fill"
                    style={{ objectFit: 'cover' }}
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
              </div>
              <div className="card-text-wrap">
                <div className="card-movie-title">{movie.title}</div>
                <div className="card-movie-desc">
                  {new Date(movie.release_date).getFullYear()} |{' '}
                  {movie.original_language.toUpperCase()}
                </div>
              </div>
            </CardWrap>
          ))}
        </>
      )}

      {/* Dday 카테고리 */}
      {cate === 'Dday' && (
        <>
          {loadMovies.slice(0, 5).map((movie) => (
            <CardWrap
              key={movie.id}
              onClick={() => openDetail(router, movie.id, 'movie')}
            >
              <div className="card-photo">
                <div className="card-PhotoTxt">{movie.release_date}</div>
                <div className="card-photo-wrap">
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    layout="fill"
                    style={{ objectFit: 'cover' }}
                    objectFit="cover"
                    objectPosition="center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="card-text-wrap">
                <div className="card-movie-title">{movie.title}</div>
                <div className="card-movie-desc">
                  {new Date(movie.release_date).getFullYear()} |{' '}
                  <span className="popularity">
                    {/* 예상평점 {movie.vote_average} */}
                  </span>
                </div>
                <div className="card-movie-info"></div>
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
  cursor: pointer;

  .card-photo {
    width: 228px;
    height: 355px;
    border-radius: 4px;
    overflow: hidden;
    padding: 10px;
    position: relative;
    z-index: 1;

    .card-photo-wrap {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 280px;
      height: 350px;
      background-color: var(--color-background-secondary);
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
      color: var(--color-text-secondary);
    }

    .card-movie-viewCnt {
      font-size: 13px;
      color: var(--color-primary-accent);
    }
  }

  .popularity {
    color: var(--color-primary-accent);
  }
`;
