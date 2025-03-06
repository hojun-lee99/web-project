'ues client';

import movieBackend, { backend, backendWithCredentials } from '@/api/axios';
import { AxiosResponse } from 'axios';

export interface MovieService {
  hello: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  genres: { id: number; name: string }[];
  runtime: number;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  origin_country?: string[];
  release_dates?: {
    results: {
      iso_3166_1: string;
      release_dates: { certification: string }[];
    }[];
  };
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  original_language: string;
  overview: string;
}

export type KnownFor = {
  id: number;
  title?: string; // 영화 제목
  name?: string; // TV 쇼 이름
  poster_path: string | null; // 포스터 이미지 경로
  media_type: 'movie' | 'tv'; // 영화 또는 TV 쇼 구분
};
export type People = {
  id: number;
  name: string;
  profile_path: string | null;
  original_name: string;
  known_for: KnownFor[];
  known_for_department: string;
};
export type Collection = {
  id: number;
  original_name: string;
  poster_path: string | null;
  overview: string | null;
};

export interface CastMember {
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  name: string;
  job: string;
  profile_path: string | null;
}

export class MovieServiceImpl implements MovieService {
  hello = 'MovieService';
  static async getData(url: string, obj?: object): Promise<AxiosResponse> {
    return movieBackend.get(url, obj);
  }

  static async getMovieDetailData(
    movieId: string,
    params?: object,
  ): Promise<AxiosResponse> {
    //reponse.data: MovieDetaile
    return MovieServiceImpl.getData(`movie/${movieId}`, {
      params: { append_to_response: 'videos,release_dates', ...params },
    });
  }

  static async getMovieCate(
    cate: string,
    params?: object,
  ): Promise<AxiosResponse> {
    return MovieServiceImpl.getData(`movie/${cate}`, {
      params: { page: 1, ...params },
    });
  }
  static async getMoviePopular(params?: object): Promise<AxiosResponse> {
    //response.data.results:Movie
    return MovieServiceImpl.getMovieCate('popular', params);
  }
  static async getMovieNowPlaying(params?: object): Promise<AxiosResponse> {
    //response.data.results:Movie
    return MovieServiceImpl.getMovieCate('now_playing', params);
  }
  static async getMovieTopRated(params?: object): Promise<AxiosResponse> {
    //response.data.results:Movie
    return MovieServiceImpl.getMovieCate('top_rated', params);
  }
  static async getMovieDday(params?: object): Promise<AxiosResponse> {
    //response.data.results:Movie
    return MovieServiceImpl.getMovieCate('Dday', params);
  }

  static async getSearchCate(
    cate: string,
    query: string,
    params?: object,
  ): Promise<AxiosResponse> {
    return MovieServiceImpl.getData(`search/${cate}`, {
      params: {
        query: query,
        page: 1,
        ...params,
      },
    });
  }
  static async getSearchMovie(
    query: string,
    params?: object,
  ): Promise<AxiosResponse> {
    //reponse.data.reuslts: Movie
    return MovieServiceImpl.getSearchCate('movie', query, params);
  }
  static async getSearchPerson(
    query: string,
    params?: object,
  ): Promise<AxiosResponse> {
    //reponse.data.reuslts: People
    return MovieServiceImpl.getSearchCate('person', query, params);
  }
  static async getSearchCollection(
    query: string,
    params?: object,
  ): Promise<AxiosResponse> {
    //reponse.data.reuslts: Collection
    return MovieServiceImpl.getSearchCate('collection', query, params);
  }

  static async getMovieIdCate(
    movieId: string,
    cate: string,
    params?: object,
  ): Promise<AxiosResponse> {
    return MovieServiceImpl.getData(`movie/${movieId}/${cate}`, {
      params: { ...params },
    });
  }
  static async getMovieIdImages(
    movieId: string,
    params?: object,
  ): Promise<AxiosResponse> {
    return MovieServiceImpl.getMovieIdCate(movieId, 'images', {
      include_image_language: 'kr,null',
      ...params,
    });
  }
  static async getMovieIdVideos(
    movieId: string,
    params?: object,
  ): Promise<AxiosResponse> {
    return MovieServiceImpl.getMovieIdCate(movieId, 'videos', params);
  }

  static async getMovieIdCredits(
    movieId: string,
    params?: object,
  ): Promise<AxiosResponse> {
    return MovieServiceImpl.getMovieIdCate(movieId, 'credits', params);
  }

  static async getDataBack(url: string, obj?: object): Promise<AxiosResponse> {
    backendWithCredentials(true);
    const response = backend.get(url, obj);
    backendWithCredentials(false);
    return response;
  }
  static async getMovieIdCateBack(
    movieId: string,
    cate: string,
    params: object,
  ) {
    return MovieServiceImpl.getDataBack(`${movieId}/${cate}`, {
      params: { ...params },
    });
  }
  static async getMovieIdCommentsBack(
    movieId: string,
    params: object,
  ): Promise<AxiosResponse> {
    return MovieServiceImpl.getMovieIdCateBack(movieId, 'comments', params);
  }
  static async getMovieIdCommentBack(
    movieId: string,
    params: object,
  ): Promise<AxiosResponse> {
    return MovieServiceImpl.getMovieIdCateBack(movieId, 'comment', params);
  }

  static async postDataBack(
    url: string,
    data: object,
    obj: object,
  ): Promise<AxiosResponse> {
    backendWithCredentials(true);
    const response = backend.post(url, data, obj);
    backendWithCredentials(false);
    return response;
  }
  static async postMovieIdCateBack(
    movieId: string,
    cate: string,
    data: object,
    obj: object,
  ): Promise<AxiosResponse> {
    return MovieServiceImpl.postDataBack(`${movieId}/${cate}`, data, obj);
  }
  static async postMovieIdCommentsBack(
    movieId: string,
    data: object,
    obj: object,
  ): Promise<AxiosResponse> {
    return MovieServiceImpl.postDataBack(`${movieId}/comments`, data, obj);
  }
  static async postMovieIdCommentBack(
    movieId: string,
    data: object,
    obj: object,
  ): Promise<AxiosResponse> {
    return MovieServiceImpl.postDataBack(`${movieId}/comment`, data, obj);
  }
}
