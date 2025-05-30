import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestAuthCode, verifyAuthCode, saveAuthInfo } from '../../../shared/apis/auth/auth';
import { requestSpaceOpen } from '../../../shared/apis/open-request/openRequest';
import { ACCESS_TOKEN } from '../../../shared/constants/storageKey';
import { handleAxiosError } from '../../../shared/utils/handleAxiosError';

export const useEmailAuthRequest = () => {
  const queryClient = useQueryClient();

  // 인증번호 요청
  const { mutate: requestAuthCodeMutation } = useMutation({
    mutationFn: ({ userEmail }: { userEmail: string }) => requestAuthCode(userEmail),
    onSuccess: (
      data,
      variables: {
        userEmail: string;
        spaceId: number;
        setShowEnterAuth: React.Dispatch<React.SetStateAction<boolean>>;
      }
    ) => {
      console.log('실행됨');
      if (data.data.isVerified) {
        localStorage.setItem(ACCESS_TOKEN, String(data.data.accessToken));
        requestSpaceOpenMutation(variables.spaceId);
      } else {
        variables.setShowEnterAuth(true);
      }
      queryClient.invalidateQueries({ queryKey: ['requestAuthCode'] });
    },
    onError: (error) => {
      console.log('인증번호 요청 오류 발생');
      handleAxiosError(error);
    },
  });

  // 인증정보 저장
  const { mutate: saveAuthInfoMutation } = useMutation({
    mutationFn: ({ userEmail }: { userEmail: string; spaceId: number }) => saveAuthInfo(userEmail),
    onSuccess: (data, variables) => {
      if (data.code === 200) {
        localStorage.setItem(ACCESS_TOKEN, String(data.data.accessToken));
        requestSpaceOpenMutation(variables.spaceId);
      } else {
        alert('인증정보 저장 실패');
      }
    },
    onError: (error) => {
      alert('인증정보 저장 오류');
      handleAxiosError(error);
    },
  });

  // 인증번호 확인
  const { mutate: verifyAuthMutation } = useMutation({
    mutationFn: ({ userEmail, authNumber }: { userEmail: string; authNumber: number }) =>
      verifyAuthCode(userEmail, authNumber),
    onSuccess: (
      data,
      variables: {
        userEmail: string;
        authNumber: number;
        spaceId: number;
        setShowEnterAuth: React.Dispatch<React.SetStateAction<boolean>>;
      }
    ) => {
      if (data.code === 200) {
        if (confirm('인증정보를 저장하시겠어요?')) {
          saveAuthInfoMutation({ userEmail: variables.userEmail, spaceId: variables.spaceId });
        } else {
          localStorage.setItem(ACCESS_TOKEN, String(data.data.accessToken));
          requestSpaceOpenMutation(variables.spaceId);
        }
      } else {
        console.log('인증번호 확인 실패');
      }
    },
    onError: (error) => {
      console.log('인증번호 확인 오류');
      handleAxiosError(error);
    },
  });

  // 개방 요청
  const { mutate: requestSpaceOpenMutation } = useMutation({
    mutationFn: (spaceId: number) => requestSpaceOpen(spaceId),
    onSuccess: () => {
      console.log('개방요청 성공');
      queryClient.invalidateQueries({ queryKey: ['requestSpaceOpen'] });
    },
    onError: (error) => {
      alert('개방요청 오류');
      handleAxiosError(error);
    },
  });

  return { requestAuthCodeMutation, verifyAuthMutation };
};
