import axios, { AxiosHeaders, AxiosResponse } from 'axios';
import { ACCESS_TOKEN } from '../constants/storageKey';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptor accesstoken 동작 아직 확인 안해봄

apiClient.interceptors.response.use(
  (response: AxiosResponse) => { // 타입을 꼭 명시해야 함!(오류 발생 방지)
    console.log('response');
    // const headers = (response.headers as AxiosHeaders).toJSON() || {};
    // console.log(headers);
    const authHeader = response.headers['authorization'] || response.headers['Authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.split(' ')[1];
      localStorage.setItem('accessToken', accessToken);
    }
    return response;
  },
  (error) => {
    console.log('axios response interceptor 에러');
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use(
  (config) => {
    console.log('request');
    const token = localStorage.getItem(ACCESS_TOKEN);
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

export default apiClient;
