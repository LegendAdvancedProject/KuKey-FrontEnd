import axios, { AxiosResponse } from 'axios';
import { getAuthToken } from '../utils/getAccessToken';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 일단 하나의 axios 인스턴스에서 사용자, 관리자 요청을 보내도록 구현했지만
// 관리자용 인스턴스, 사용자용 인스턴스를 따로 생성해서 요청 책임을 분리하는게 클린할 듯
apiClient.interceptors.request.use(
  (config) => {
    console.log('interceptor request');

    const token = getAuthToken(); // adminToken이 있으면 adminToken을 헤더에 넣어 요청을 보내고, 없으면 userToken을 넣어서 요청 보냄
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
  (response: AxiosResponse) => { // 타입을 꼭 명시해야 함!(오류 발생 방지)
    console.log('interceptor response');

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
