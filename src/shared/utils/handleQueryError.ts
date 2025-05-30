import { ErrorType } from '../types/errorType';

export const handleQueryError = async (error: ErrorType) => {
  // 추후 오류에 따라 별도 로직 구현 필요
  switch (error.code) {
    case 400:
      alert(error.message);
      break;
    case 404:
      alert(error.message);
      break;
    case 405:
      alert(error.message);
      break;
    case 2001:
      alert(error.message);
      break;
    case 2002:
      alert(error.message);
      break;
    case 2003:
      alert(error.message);
      break;
    case 2004:
      alert(error.message);
      break;
    default:
      alert('handleQueryError: 알 수 없는 오류가 발생했습니다.');
      break;
  }
};
