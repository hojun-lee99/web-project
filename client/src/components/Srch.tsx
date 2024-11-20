'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  original_language: string;
};

type CardSrchProps = {
  srchProps: string;
};

export default function CardSrch({ srchProps }: CardSrchProps) {
  const [loadMovies, setLoadMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/search/movie', {
        params: { query, language: 'ko-KR', page: 1 },
      });

      // API 응답 확인
      console.log(response.data);

      setLoadMovies(response.data.results || []);
    } catch (err) {
      setError('영화 데이터를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (srchProps) {
      fetchMovies(srchProps);
    }
  }, [srchProps]);

  return (
    <CardListWrap>
      {loading && <p>로딩 중...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && loadMovies.length === 0 && <p>검색 결과가 없습니다.</p>}
      {!loading &&
        loadMovies.slice(0, 10).map((movie) => (
          <CardWrap key={movie.id}>
            <div className="card-photo">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Placeholder>No Image</Placeholder>
              )}
            </div>
            <div className="card-text-wrap">
              <div className="card-movie-title">{movie.title}</div>
              <div className="card-movie-desc">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'} |{' '}
                {movie.original_language.toUpperCase()}
              </div>
            </div>
          </CardWrap>
        ))}
    </CardListWrap>
  );
}

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

  .card-photo {
    height: 355px;
    border-radius: 4px;
    overflow: hidden;
    background-color: #f0f0f0;
    position: relative;
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
  }
`;

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 14px;
  color: #aaa;
  background-color: #e0e0e0;
`;
