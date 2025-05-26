import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { requestAuthCode, verifyAuthCode } from '../../shared/apis/auth/auth';
import { ACCESS_TOKEN } from '../../shared/constants/storageKey';
import { requestSpaceOpen } from '../../shared/apis/open-request/openRequest';

export const useEmailAuthForm = () => {
  // 이메일 입력 폼
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    watch: watchEmail,
    formState: { errors: errorsEmail, isValid: isValidEmail },
  } = useForm<{ userEmail: string }>({ mode: 'onChange' });

  // 인증번호 입력 폼
  const {
    register: registerAuth,
    handleSubmit: handleSubmitAuth,
    watch: watchAuth,
    formState: { errors: errorsAuth },
  } = useForm<{ authNumber: number }>({ mode: 'onChange' });

  const [showEnterAuth, setShowEnterAuth] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const userEmail = watchEmail('userEmail');
  const authNumber = watchAuth('authNumber');

  // 이메일 제출 처리
  const onSubmitEmail: SubmitHandler<{ userEmail: string }> = async (data) => {
    console.log('이메일 제출 성공!', data);
    try {
      const response = await requestAuthCode(userEmail);

      if (response.data.isVerified) {
        // accessToken 저장
        localStorage.setItem(ACCESS_TOKEN, String(response.data.accessToken));

        // 개방 요청
        const result = await requestSpaceOpen(1);
        console.log(result.data);
      } else {
        setShowEnterAuth(true); // 인증번호 입력 필드 보여주기
      }
    } catch {
      alert('인증번호 요청 오류가 발생했습니다.');
    }
  };

  // 인증번호 제출 처리
  const onSubmitAuth: SubmitHandler<{ authNumber: number }> = async (data) => {
    console.log('인증번호 제출 성공!', data);
    console.log('인증정보 확인 요청됨');
    try {
      const response = await verifyAuthCode(userEmail, authNumber);
      if (response.code === 200) {
        // 인증 성공, accessToken 저장 등 처리
      }
    } catch {
      alert('인증정보 확인 오류가 발생했습니다.');
    }
  };

  const handleBack = () => setShowEnterAuth(false);

  return {
    // 이메일 관련
    registerEmail,
    handleSubmitEmail,
    errorsEmail,
    isValidEmail,
    userEmail,
    // 인증번호 관련
    registerAuth,
    handleSubmitAuth,
    errorsAuth,
    authNumber,
    // 상태
    showEnterAuth,
    setShowEnterAuth,
    // 액션
    onSubmitEmail,
    onSubmitAuth,
    handleBack,
  };
};
