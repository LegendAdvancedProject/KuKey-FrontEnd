import { AxiosError } from 'axios';
import { ErrorType } from '../types/errorType';

// Axios 요청에서 발생하는 에러를 서버의 응답 명세에 맞게 처리하고 변환하기 위한 함수
export const handleAxiosError = (error: unknown) => {
  // error는 Axios 요청 중 발생할 수 있는 어떤 타입의 에러든 받을 수 있으므로 unknown으로 선언
  const err = error as AxiosError;
  // error를 AxiosError로 타입 캐스팅

  if (err.response) {
    // 에러에 응답(response)이 포함된 경우만 처리함(response는 AxiosError 타입에서 제공하는 기본 속성)

    console.log("들어왔당");
    console.log(err.response.data);
    const { data } = err.response;
    const serverError = data as ErrorType;
    throw serverError;
  }

  // 서버 응답이 없는 경우 기본 오류 메시지로 처리
  throw new Error('알 수 없는 오류가 발생했습니다.');
};

/* 
AxiosError: Axios 라이브러리가 제공하는 에러 객체 타입
err.response: 서버의 응답을 담은 객체
err.response.status: HTTP 응답 상태 코드(400, 500 등)
err.response.data: 서버에서 반환한 응답 body

status, data: err.response에서 구조분해할당한 속성
status: 서버의 HTTP 상태 코드
data: 서버가 반환한 JSON 또는 응답 내용
*/
