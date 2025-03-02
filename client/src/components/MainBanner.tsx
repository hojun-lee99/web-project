'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { openDetail } from '@/hooks/openDetail';
import { useState, useEffect } from 'react';
import { Movie, MovieServiceImpl } from '@/service/MovieService';

export default function MainBanner() {
  const router = useRouter();

  const [loadMovies, setLoadMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    try {
      const response = await MovieServiceImpl.getMovieNowPlaying();
      const movies = response.data.results;
      setLoadMovies(movies);
      console.log(movies);
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      className="swiper"
    >
      {loadMovies.slice(0, 5).map((movie) => (
        <SwiperSlide
          key={movie.id}
          onClick={() => openDetail(router, movie.id, 'movie')}
        >
          <SlideInnerWrap
            background={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          >
            <SlideTxtWrap>
              <div className="slide-movie-title">{movie.title}</div>
              <div className="slide-movie-info">
                {new Date(movie.release_date).getFullYear()} |{' '}
                {movie.original_language.toUpperCase()}
              </div>
              <div className="slide-movie-desc">{movie.overview}</div>
            </SlideTxtWrap>
          </SlideInnerWrap>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

// 스타일 정의
const SlideInnerWrap = styled.div<{ background: string }>`
  height: 708px;
  width: 100%;
  background-color: #d7d7d7;
  padding: 122px 0 100px;
  display: flex;
  align-items: flex-end;
  margin: 0 auto 0;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
`;

const SlideTxtWrap = styled.div`
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    top: 0;
    left: 0;
    z-index: -1;
  }
  &::before {
    display: none;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    top: 0;
    left: 0;
    z-index: -1;
  }

  z-index: 1;
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
  .slide-movie-title {
    font-size: 28px;
    line-height: 1;
    margin-bottom: 20px;
    position: relative;
  }
  .slide-movie-info {
    font-size: 16px;
    line-height: 20px;
    color: var(--color-text-secondary);
    margin-bottom: 10px;
    max-width: 800px;
  }
  .slide-movie-desc {
    font-size: 16px;
    line-height: 20px;
    height: 100px;
    color: var(--color-text-secondary);
    margin-bottom: 10px;
    max-width: 800px;
  }
`;
