import { AxiosError } from 'axios';
import { ErrorType } from '../types/errorType';

// tanstack-query 설정으로 onError를 전역적으로 관리한다면 필요없는 파일

export const handleAxiosError = (error: unknown) => {
  const err = error as AxiosError;
  
  if (err.response) {
    console.log(err.response.data);
    const { data } = err.response;
    const serverError = data as ErrorType;
    throw serverError;
  }

  throw new Error('알 수 없는 오류가 발생했습니다.');
};
