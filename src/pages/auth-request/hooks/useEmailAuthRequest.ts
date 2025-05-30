import { requestAuthCode, verifyAuthCode, saveAuthInfo } from '../../../shared/apis/auth/auth';
import { requestSpaceOpen } from '../../../shared/apis/open-request/openRequest';
import { ACCESS_TOKEN } from '../../../shared/constants/storageKey';

export const useEmailAuthRequest = () => {
  const requestAuth = async (
    userEmail: string,
    setShowEnterAuth: React.Dispatch<React.SetStateAction<boolean>>,
    spaceId: number
  ) => {
    try {
      const response = await requestAuthCode(userEmail);
      if (response.data.isVerified) {
        localStorage.setItem(ACCESS_TOKEN, String(response.data.accessToken));
        const result = await requestSpaceOpen(spaceId);
        console.log(result.data);
      } else {
        setShowEnterAuth(true);
      }
    } catch {
      alert('인증번호 요청 오류');
    }
  };

  const verifyAuth = async (userEmail: string, authNumber: number, spaceId: number) => {
    try {
      const response = await verifyAuthCode(userEmail, authNumber);
      if (response.code === 200) {
        if (confirm('인증정보를 저장하시겠어요?')) {
          const saveResponse = await saveAuthInfo(userEmail);
          if (saveResponse.code === 200) {
            localStorage.setItem(ACCESS_TOKEN, String(saveResponse.data.accessToken));
            const result = await requestSpaceOpen(spaceId);
            console.log(result.data);
          } else {
            alert('인증정보 저장 실패');
          }
        } else {
          localStorage.setItem(ACCESS_TOKEN, String(response.data.accessToken));
          const result = await requestSpaceOpen(spaceId);
          console.log(result.data);
        }
      } else {
        alert('인증번호 요청 실패');
      }
    } catch {
      alert('인증정보 확인 오류');
    }
  };

  return { requestAuth, verifyAuth };
};
