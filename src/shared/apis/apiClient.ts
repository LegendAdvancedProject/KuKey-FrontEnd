import axios, { AxiosResponse } from 'axios';
import { USER_ACCESS_TOKEN } from '../constants/storageKey';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log('interceptor request');
    const token = localStorage.getItem(USER_ACCESS_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log('axios request interceptor 에러');
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 타입을 꼭 명시해야 함!(오류 발생 방지)
    console.log('interceptor response');

    // Authorization 헤더 처리
    const authHeader = response.headers['authorization'] || response.headers['Authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.split(' ')[1];
      localStorage.setItem(USER_ACCESS_TOKEN, accessToken);
    }

    // HTTP 레벨 에러 통과(status code가 200, 서버와의 통신은 성공함)
    // 하지만 자체 에러 핸들링 해야하는 경우를 처리하는 코드
    const { code } = response.data;
    if (code && code !== 200) {
      return Promise.reject({
        ...response.data,
      });
    }

    return response;
  },
  (error) => {
    console.log('axios response interceptor 에러');
    return Promise.reject(error); // HTTP 레벨 에러 (4xx, 5xx 등)
  }
);

export default apiClient;
