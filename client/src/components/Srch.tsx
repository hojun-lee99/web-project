'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import TitleSm from './elements/TitleSm';
import { useRouter } from 'next/navigation';
import { openDetail } from '@/hooks/openDetail';
import Image from 'next/image';
import { AxiosResponse } from 'axios';

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  original_language: string;
};

type KnownFor = {
  id: number;
  title?: string; // 영화 제목
  name?: string; // TV 쇼 이름
  poster_path: string | null; // 포스터 이미지 경로
  media_type: 'movie' | 'tv'; // 영화 또는 TV 쇼 구분
};

type People = {
  id: number;
  name: string;
  profile_path: string | null;
  original_name: string;
  known_for: KnownFor[];
  known_for_department: string;
};
type Collection = {
  id: number;
  original_name: string;
  poster_path: string | null;
  overview: string | null;
};
type LoadDataType = Movie | People | Collection;
type LoadDataConfig = {
  page: number;
  legth: number;
  count: number;
  onLoad: boolean;
};
type CardSrchProps = {
  srchProps: string;
  selected: string;
};

export default function CardSrch({ srchProps, selected }: CardSrchProps) {
  const contentPerPage = 20;
  const contentCount = 5;
  const router = useRouter();

  const [loadMovies, setLoadMovies] = useState<Movie[]>([]);
  const [loadPeople, setLoadPeople] = useState<People[]>([]);
  const [loadCollection, setLoadCollection] = useState<Collection[]>([]);
  const [movieConfig, setMovieConfig] = useState<LoadDataConfig>(
    {} as LoadDataConfig,
  );
  const [peopleConfig, setPeopleConfig] = useState<LoadDataConfig>(
    {} as LoadDataConfig,
  );
  const [collectionConfig, setCollectionConfig] = useState<LoadDataConfig>(
    {} as LoadDataConfig,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addLoadData = (
    data: LoadDataType[],
    type: string | 'movie' | 'people' | 'collection',
    reset: boolean = false,
  ) => {
    switch (type) {
      case 'movie':
        setLoadMovies((d) => {
          return reset ? (data as Movie[]) : [...d, ...(data as Movie[])];
        });
        break;
      case 'people':
        setLoadPeople((d) => {
          return reset ? (data as People[]) : [...d, ...(data as People[])];
        });
        break;
      case 'collection':
        setLoadCollection((d) => {
          return reset
            ? (data as Collection[])
            : [...d, ...(data as Collection[])];
        });
        break;
    }
  };
  const fetchData = async (
    query: string,
    type: string | 'movie' | 'people' | 'collection',
    page: number = 1,
  ): Promise<AxiosResponse<any>> => {
    let re;
    switch (type) {
      case 'movie':
        re = axios.get('/search/movie', {
          params: { query, language: 'ko-KR', page: page },
        });
        break;
      case 'people':
        re = axios.get('/search/person', {
          params: {
            query,
            include_adult: false,
            language: 'ko-KR',
            page: page,
          },
        });
        break;
      case 'collection':
        re = axios.get('/search/collection', {
          params: {
            query,
            include_adult: false,
            language: 'ko-KR',
            page: page,
          },
        });
        break;
    }
    return re as Promise<AxiosResponse>;
  };
  const moreFetchData = async (
    query: string,
    type: string | 'movie' | 'people' | 'collection',
  ) => {
    const more = async (config: LoadDataConfig, type: string) => {
      if (config.onLoad) {
        const setData: LoadDataConfig = {
          count: config.count,
          page: config.page,
          legth: config.legth,
          onLoad: config.onLoad,
        };
        setData.count = setData.count + contentCount;
        if (config.count / contentPerPage >= config.page) {
          setData.page = setData.page + 1;
          const response = await fetchData(query, type, config.page + 1);
          if (!response.data.results) {
            setData.onLoad = false;
          }
          addLoadData(response.data.results || [], type);
        }
        if (setData.legth < setData.count) {
          setData.onLoad = false;
        }
        switch (type) {
          case 'movie':
            setMovieConfig(() => {
              return setData;
            });
            break;
          case 'people':
            setPeopleConfig(() => {
              return setData;
            });
            break;
          case 'collection':
            setCollectionConfig(() => {
              return setData;
            });
            break;
        }
      }
    };
    switch (type) {
      case 'movie':
        more(movieConfig, type);
        break;
      case 'people':
        more(peopleConfig, type);
        break;
      case 'collection':
        more(collectionConfig, type);
        break;
    }
  };

  const fetchMovies = async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchData(query, 'movie');
      const response2 = await fetchData(query, 'people');
      const response3 = await fetchData(query, 'collection');
      const setData = response.data.results ? [...response.data.results] : [];
      const setData2 = response2.data.results
        ? [...response2.data.results]
        : [];
      const setData3 = response3.data.results
        ? [...response3.data.results]
        : [];
      addLoadData(setData, 'movie', true);
      addLoadData(setData2, 'people', true);
      addLoadData(setData3, 'collection', true);
      setMovieConfig(() => {
        return {
          page: 1,
          count: contentCount,
          legth: setData.length,
          onLoad: true,
        };
      });
      setPeopleConfig(() => {
        return {
          page: 1,
          count: contentCount,
          legth: setData2.length,
          onLoad: true,
        };
      });
      setCollectionConfig(() => {
        return {
          page: 1,
          count: contentCount,
          legth: setData3.length,
          onLoad: true,
        };
      });
    } catch (err) {
      setError('데이터를 불러오는 데 실패했습니다.');
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

  if (loading) {
    return <p>로딩 중...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  const notDataText = () => <p>검색 결과가 없습니다.</p>;
  const notData = (data: any[]) => {
    if (data.length === 0) {
      return true;
    }
    return false;
  };
  if (selected === 'movie') {
    return (
      <React.Fragment>
        {notData(loadMovies) ? (
          notDataText()
        ) : (
          <React.Fragment>
            <CardListWrap>
              <TitleSm title={'영화'} viewMore={false} cate={''} />
              {loadMovies.slice(0, movieConfig.count).map((movie) => (
                <CardWrap
                  key={movie.id}
                  onClick={() => openDetail(router, movie.id, 'movie')}
                >
                  <div className="card-photo">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        layout="fill"
                        style={{
                          objectFit: 'cover', // 이미지 비율 유지하며 채우기
                          objectPosition: 'center', // 이미지 중앙 정렬
                        }}
                        sizes="(max-width: 768px) 100%, (max-width: 1320px) 100%, 100%"
                      />
                    ) : (
                      <Placeholder>No Image</Placeholder>
                    )}
                  </div>
                  <div className="card-text-wrap">
                    <div className="card-movie-title">{movie.title}</div>
                    <div className="card-movie-desc">
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : 'N/A'}{' '}
                      | {movie.original_language.toUpperCase()}
                    </div>
                  </div>
                </CardWrap>
              ))}
            </CardListWrap>
            {movieConfig.onLoad && (
              <MoreButton
                onClick={async () => {
                  await moreFetchData(srchProps, 'movie');
                }}
              >
                더보기
              </MoreButton>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
  if (selected === 'people') {
    return (
      <>
        {notData(loadPeople) ? (
          notDataText()
        ) : (
          <React.Fragment>
            <CardListWrapCol>
              <TitleSm title={'사람'} viewMore={false} cate={''} />
              {loadPeople.slice(0, peopleConfig.count).map((people) => (
                <CardSideWrap
                  key={people.id}
                  onClick={() => openDetail(router, people.id, 'people')}
                  className="cardSideWrap"
                >
                  <div className="card-photo">
                    {people.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${people.profile_path}`}
                        alt={people.name}
                        layout="fill"
                        style={{
                          objectFit: 'cover', // 이미지 비율 유지하며 채우기
                          objectPosition: 'center', // 이미지 중앙 정렬
                        }}
                        sizes="(max-width: 768px) 100%, (max-width: 1320px) 100%, 100%"
                      />
                    ) : (
                      <Placeholder>No Image</Placeholder>
                    )}
                  </div>
                  <div className="card-text-wrap">
                    <div className="card-movie-title">{people.name}</div>
                    <div className="card-movie-desc">
                      {people.known_for && people.known_for.length > 0
                        ? people.known_for
                            .slice(0, 3)
                            .map((item) => item.title || item.name)
                            .join(', ')
                        : '대표작 없음'}
                    </div>
                  </div>
                </CardSideWrap>
              ))}
            </CardListWrapCol>
            {peopleConfig.onLoad && (
              <MoreButton
                onClick={() => {
                  moreFetchData(srchProps, 'people');
                }}
              >
                더보기
              </MoreButton>
            )}
          </React.Fragment>
        )}
      </>
    );
  }
  if (selected === 'collection') {
    return (
      <>
        {notData(loadCollection) ? (
          notDataText()
        ) : (
          <React.Fragment>
            <CardListWrapCol>
              <TitleSm title={'컬렉션'} viewMore={false} cate={''} />
              {loadCollection
                .slice(0, collectionConfig.count)
                .map((collection) => (
                  <CardSideWrap
                    key={collection.id}
                    onClick={() =>
                      openDetail(router, collection.id, 'collection')
                    }
                    className="cardSideWrap"
                  >
                    <div className="card-photo">
                      {collection.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${collection.poster_path}`}
                          alt={collection.original_name}
                          layout="fill"
                          style={{
                            objectFit: 'cover', // 이미지 비율 유지하며 채우기
                            objectPosition: 'center', // 이미지 중앙 정렬
                          }}
                          sizes="(max-width: 768px) 100%, (max-width: 1320px) 100%, 100%"
                        />
                      ) : (
                        <Placeholder>No Image</Placeholder>
                      )}
                    </div>
                    <div className="card-text-wrap">
                      <div className="card-movie-title">
                        {collection.original_name}
                      </div>
                      <div className="card-movie-desc">
                        {collection.overview
                          ? collection.overview
                          : '대표작 없음'}
                      </div>
                    </div>
                  </CardSideWrap>
                ))}
            </CardListWrapCol>
            {collectionConfig.onLoad && (
              <MoreButton
                onClick={() => {
                  moreFetchData(srchProps, 'collection');
                }}
              >
                더보기
              </MoreButton>
            )}
          </React.Fragment>
        )}
      </>
    );
  }
  return (
    <>
      {notData(loadMovies) && notData(loadPeople) && notData(loadCollection) ? (
        notDataText()
      ) : (
        <React.Fragment>
          <CardListWrap>
            <TitleSm title={'영화'} viewMore={false} cate={''} />
            {loadMovies.slice(0, 5).map((movie) => (
              <CardWrap
                key={movie.id}
                onClick={() => openDetail(router, movie.id, 'movie')}
              >
                <div className="card-photo">
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      layout="fill"
                      style={{
                        objectFit: 'cover', // 이미지 비율 유지하며 채우기
                        objectPosition: 'center', // 이미지 중앙 정렬
                      }}
                      sizes="(max-width: 768px) 100%, (max-width: 1320px) 100%, 100%"
                    />
                  ) : (
                    <Placeholder>No Image</Placeholder>
                  )}
                </div>
                <div className="card-text-wrap">
                  <div className="card-movie-title">{movie.title}</div>
                  <div className="card-movie-desc">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : 'N/A'}{' '}
                    | {movie.original_language.toUpperCase()}
                  </div>
                </div>
              </CardWrap>
            ))}
          </CardListWrap>

          <DivideBar />

          <CardListWrapCol>
            <TitleSm title={'사람'} viewMore={false} cate={''} />
            {loadPeople.slice(0, 3).map((people) => (
              <CardSideWrap
                key={people.id}
                onClick={() => openDetail(router, people.id, 'people')}
                className="cardSideWrap"
              >
                <div className="card-photo">
                  {people.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${people.profile_path}`}
                      alt={people.name}
                      layout="fill"
                      style={{
                        objectFit: 'cover', // 이미지 비율 유지하며 채우기
                        objectPosition: 'center', // 이미지 중앙 정렬
                      }}
                      sizes="(max-width: 768px) 100%, (max-width: 1320px) 100%, 100%"
                    />
                  ) : (
                    <Placeholder>No Image</Placeholder>
                  )}
                </div>
                <div className="card-text-wrap">
                  <div className="card-movie-title">{people.name}</div>
                  <div className="card-movie-desc">
                    {people.known_for && people.known_for.length > 0
                      ? people.known_for
                          .slice(0, 3)
                          .map((item) => item.title || item.name)
                          .join(', ')
                      : '대표작 없음'}
                  </div>
                </div>
              </CardSideWrap>
            ))}
          </CardListWrapCol>

          <DivideBar />

          <CardListWrapCol>
            <TitleSm title={'컬렉션'} viewMore={false} cate={''} />
            {loadCollection.slice(0, 3).map((collection) => (
              <CardSideWrap
                key={collection.id}
                onClick={() => openDetail(router, collection.id, 'collection')}
                className="cardSideWrap"
              >
                <div className="card-photo">
                  {collection.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${collection.poster_path}`}
                      alt={collection.original_name}
                      layout="fill"
                      style={{
                        objectFit: 'cover', // 이미지 비율 유지하며 채우기
                        objectPosition: 'center', // 이미지 중앙 정렬
                      }}
                      sizes="(max-width: 768px) 100%, (max-width: 1320px) 100%, 100%"
                    />
                  ) : (
                    <Placeholder>No Image</Placeholder>
                  )}
                </div>
                <div className="card-text-wrap">
                  <div className="card-movie-title">
                    {collection.original_name}
                  </div>
                  <div className="card-movie-desc">
                    {collection.overview ? collection.overview : '대표작 없음'}
                  </div>
                </div>
              </CardSideWrap>
            ))}
          </CardListWrapCol>
        </React.Fragment>
      )}
    </>
  );
}

const DivideBar = styled.div`
  padding-top: 42px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 36px;
`;

const MoreButton = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  margin: 15px;
`;

const CardListWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const CardListWrapCol = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const CardWrap = styled.div`
  width: 100%;
  max-width: 248px;
  height: auto;
  cursor: pointer;

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

const CardSideWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  cursor: pointer;

  max-width: 496px;
  width: 100%;
  .card-photo {
    width: 67px;
    height: 99px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .card-text-wrap {
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;

    .card-movie-title {
      font-size: 16px;
      font-weight: 500;
      line-height: 22px;
    }

    .card-movie-desc {
      font-size: 14px;
      color: #555;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`;
