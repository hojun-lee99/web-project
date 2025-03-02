import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface UserFormData {
  name: string;
  email: string;
  password: string;
}

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOVIE_DB_URL as string,
  params: {
    api_key: process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY as string,
    language: 'ko-KR',
    include_adult: false,
  },
});

const backend: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_DEV as string,
});

export function backendWithCredentials(set: boolean) {
  if (set) {
    if (!backend.defaults.withCredentials) {
      backend.defaults.withCredentials = true;
    }
  } else {
    if (backend.defaults.withCredentials) {
      backend.defaults.withCredentials = false;
    }
  }
}
const fakeBackend = {
  timeout: 1000,
  async login(userData: UserFormData): Promise<AxiosResponse> {
    await new Promise((resolve) => {
      return setTimeout(resolve, this.timeout);
    });
    return {
      data: {
        name: userData.email,
        jwt: userData.password,
      },
      status: 200,
      statusText: 'OK',
    } as AxiosResponse;
  },
  async logout() {
    await new Promise((resolve) => {
      return setTimeout(resolve, this.timeout);
    });
    return true;
  },
  async signup(userData: UserFormData): Promise<AxiosResponse> {
    console.log(userData);
    await new Promise((resolve) => {
      return setTimeout(resolve, this.timeout);
    });
    return {
      data: {
        message: 'Hello',
      },
      status: 200,
      statusText: 'OK',
    } as AxiosResponse;
  },
  async getContentComment(movieId: string) {
    console.log(movieId);
    await new Promise((resolve) => {
      return setTimeout(resolve, this.timeout);
    });
    return contentComment;
  },
};

export default instance;

export { backend, fakeBackend };

const contentComment = [
  { id: 'User1', rating: 4.0, text: '짧은 코멘트입니다.' },
  { id: 'User2', rating: 3.5, text: '예시 데이터' },
  {
    id: 'User3',
    rating: 5.0,
    text: '억지 글래디에이터 감성 주입에 잔인한 액션 추가...',
  },
  {
    id: 'User4',
    rating: 2.5,
    text: '영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...불리는',
  },
  {
    id: 'User5',
    rating: 2.5,
    text: '영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...영화 글래디에이터 2는 전쟁영화의 거장으로 불리는...불리는',
  },
  { id: 'User6', rating: 4.5, text: '놀라운 영화였습니다. 정말 강추합니다!' },
  { id: 'User7', rating: 3.0, text: '평범한 수준의 영화였습니다.' },
  { id: 'User8', rating: 4.8, text: '강렬한 액션이 인상 깊었습니다.' },
  { id: 'User9', rating: 1.5, text: '스토리가 빈약하고 실망스러웠습니다.' },
];
