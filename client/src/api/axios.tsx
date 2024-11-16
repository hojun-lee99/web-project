import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY as string,
    language: 'ko-KR',
  },
});

export default instance;
