'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { MovieServiceImpl } from '@/service/MovieService';

interface GallerySliderProps {
  data: {
    movieId: string | number;
    type: 'image' | 'video';
  };
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  margin-top: 0;
`;

export default function GallerySlider({ data }: GallerySliderProps) {
  const { movieId, type } = data;
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === 'image') {
          const response = await MovieServiceImpl.getMovieIdImages(
            movieId as string,
          );
          const backdrops = response.data?.backdrops || [];
          const limitedBackdrops = backdrops
            .slice(0, 9) // 최대 9개의 이미지만 선택
            .map((backdrop: { file_path: string }) => backdrop.file_path);
          setItems(limitedBackdrops);
        } else if (type === 'video') {
          const response = await MovieServiceImpl.getMovieIdVideos(
            movieId as string,
          );
          const videos = response.data?.results || [];
          const videoKeys = videos
            .filter((video: { site: string }) => video.site === 'YouTube')
            .slice(0, 9) // 최대 9개의 비디오만 선택
            .map((video: { key: string }) => video.key);
          setItems(videoKeys);
        }
      } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId, type]);

  return (
    <StyledSwiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={3}
      navigation={items.length > 3}
      pagination={false}
    >
      {loading ? (
        <SwiperSlide>
          <SlideContent isVideo={type === 'video'}>Loading...</SlideContent>
        </SwiperSlide>
      ) : items.length > 0 ? (
        items.map((item, index) => (
          <SwiperSlide key={index}>
            <SlideContent isVideo={type === 'video'}>
              {type === 'image' ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item}`}
                  alt={`Still ${index + 1}`}
                  layout="fill"
                  style={{
                    objectFit: 'cover', // 이미지 비율 유지하며 채우기
                    objectPosition: 'center', // 이미지 중앙 정렬
                  }}
                  sizes="(max-width: 768px) 33%, (max-width: 1320px) 24%, 33%"
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${item}`}
                  title={`Video ${index + 1}`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </SlideContent>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <SlideContent isVideo={type === 'video'}>
            No {type === 'image' ? 'Images' : 'Videos'} Available
          </SlideContent>
        </SwiperSlide>
      )}
    </StyledSwiper>
  );
}
const SlideContent = styled.div<{ isVideo: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;

  ${({ isVideo }) =>
    isVideo &&
    `
    padding-top: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    position: relative;
    overflow: hidden;
  `}

  iframe {
    border: none;
    width: 100%;
    height: 100%;
    ${({ isVideo }) =>
      isVideo &&
      `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `}
  }
`;
