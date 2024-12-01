'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import Image from 'next/image';

interface PeopleInfoProps {
  data: {
    category: string | number;
    movieId: string | number;
  };
}

interface CastMember {
  name: string;
  character: string;
  profile_path: string | null;
}

interface CrewMember {
  name: string;
  job: string;
  profile_path: string | null;
}

export default function PeopleInfo({ data }: PeopleInfoProps) {
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      if (
        typeof data.movieId === 'string' ||
        typeof data.movieId === 'number'
      ) {
        try {
          const { data: creditsData } = await axios.get(
            `movie/${data.movieId}/credits`,
          );
          setCast(creditsData.cast || []);
          setCrew(creditsData.crew || []);
        } catch (error) {
          console.error('Error fetching credits data:', error);
        }
      }
    };

    fetchMovieCredits();
  }, [data.movieId]);

  let content;
  if (data.category === 'movies' || data.category === 'series') {
    content = <p>출연 / 제작</p>;
  } else if (data.category === 'books') {
    content = <p>저자 / 역자</p>;
  } else if (data.category === 'webtoon') {
    content = <p>작가</p>;
  } else {
    content = <p>기타</p>; // 예외 처리
  }

  return (
    <InfoWrap>
      <header>{content}</header>
      <PeopleInfoList>
        {crew
          .filter((member) => member.job === 'Director') // 감독만 필터링
          .map((director) => (
            <li key={director.name}>
              <div className="info-photo">
                {director.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                    alt={director.name}
                    layout="fill"
                    objectFit="cover" // 이미지 비율 유지하며 채우기
                    objectPosition="center" // 이미지 위치 조정
                  />
                ) : (
                  <div>No Image</div>
                )}
              </div>
              <div>
                <p className="info-name">{director.name}</p>
                <p className="info-role">감독</p>
              </div>
            </li>
          ))}
        {cast.slice(0, 7).map(
          (
            actor, // 상위 5명만 표시
          ) => (
            <li key={actor.name}>
              <div className="info-photo">
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    layout="fill"
                    objectFit="cover" // 이미지 비율 유지하며 채우기
                    objectPosition="center" // 이미지 위치 조정
                  />
                ) : (
                  <div>No Image</div>
                )}
              </div>
              <div>
                <p className="info-name">{actor.name}</p>
                <p className="info-role">{actor.character}</p>
              </div>
            </li>
          ),
        )}
      </PeopleInfoList>
    </InfoWrap>
  );
}

const InfoWrap = styled.section`
  width: 100%;
  margin-top: 60px;

  header {
    display: flex;
    margin-bottom: 60px;
    justify-content: space-between;
    align-items: center;

    p {
      display: flex;
      font-size: 24px;
      align-items: center;
      font-weight: 600;
    }
  }
`;

const PeopleInfoList = styled.ul`
  width: 100%;
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  li {
    display: flex;
    width: calc(25% - (60px / 4));
  }

  li > div:nth-of-type(2) {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }

  .info-photo {
    position: relative;
    background-color: var(--color-background-secondary);
    width: 56px;
    height: 56px;
    margin-right: 10px;
    border-radius: 4px;
    overflow: hidden;

    img {
      position: absolute;
      top: -20%;
      width: 100%;
    }
  }

  .info-name {
    font-size: 16px;
    font-weight: 600;
  }

  .info-role {
    font-size: 14px;
  }
`;
