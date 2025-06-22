import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestAuthCode, verifyAuthCode, saveAuthInfo } from '../../../shared/apis/user/auth/auth';
import { requestSpaceOpen } from '../../../shared/apis/user/open-request/openRequest';
import { USER_ACCESS_TOKEN } from '../../../shared/constants/storageKey';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export const useEmailAuthRequest = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalConfirmHandler, setModalConfirmHandler] = useState<() => void>(() => () => {});
  const [modalCloseHandler, setModalCloseHandler] = useState<() => void>(() => () => {});
  const [showCancelButton, setShowCancelButton] = useState(true);

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
        localStorage.setItem(USER_ACCESS_TOKEN, String(data.data.accessToken));
        setModalContent('개방이 요청되었습니다');
        setModalConfirmHandler(() => () => {
          setIsModalOpen(false);
          navigate('/');
        });
        setShowCancelButton(true);
        setIsModalOpen(true);
        requestSpaceOpenMutation(variables.spaceId);
      } else {
        variables.setShowEnterAuth(true);
      }
      queryClient.invalidateQueries({ queryKey: ['requestAuthCode'] });
    },
    // onError: (error) => {
    //   console.log('인증번호 요청 오류 발생');
    //   handleAxiosError(error);
    // },
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
        // 인증정보 저장 여부 모달 설정
        setModalContent('인증정보를 저장하시겠어요?');
        setModalConfirmHandler(() => () => {
          saveAuthInfoMutation({ userEmail: variables.userEmail, spaceId: variables.spaceId });
        });
        setModalCloseHandler(() => () => {
          setIsModalOpen(false);
          localStorage.setItem(USER_ACCESS_TOKEN, String(data.data.accessToken));
          requestSpaceOpenMutation(variables.spaceId);
          setModalContent('개방이 요청되었습니다');
          setModalConfirmHandler(() => () => {
            setIsModalOpen(false);
            navigate('/');
          });
          setShowCancelButton(false);
          setIsModalOpen(true);
        });
        setShowCancelButton(true);
        setIsModalOpen(true);
      } else {
        setModalContent('인증정보 확인 실패');
        setModalConfirmHandler(() => () => {
          setIsModalOpen(false);
        });
        setShowCancelButton(false);
        setIsModalOpen(true);
      }
    },
  });

  // 인증정보 저장
  const { mutate: saveAuthInfoMutation } = useMutation({
    mutationFn: ({ userEmail }: { userEmail: string; spaceId: number }) => saveAuthInfo(userEmail),
    onSuccess: (data, variables) => {
      if (data.code === 200) {
        localStorage.setItem(USER_ACCESS_TOKEN, String(data.data.accessToken));
        requestSpaceOpenMutation(variables.spaceId);
        setModalContent('개방이 요청되었습니다');
        setModalConfirmHandler(() => () => {
          setIsModalOpen(false);
          navigate('/');
        });
        setShowCancelButton(true);
        setIsModalOpen(true);
      } else {
        setModalContent('인증정보 저장 실패');
        setModalConfirmHandler(() => () => {
          setIsModalOpen(false);
        });
        setShowCancelButton(false);
        setIsModalOpen(true);
      }
    },
  });

  // 개방 요청
  const { mutate: requestSpaceOpenMutation } = useMutation({
    mutationFn: (spaceId: number) => requestSpaceOpen(spaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestSpaceOpen'] });
    },
  });

  return {
    isModalOpen,
    modalContent,
    modalConfirmHandler,
    modalCloseHandler,
    setIsModalOpen,
    showCancelButton,
    requestAuthCodeMutation,
    verifyAuthMutation,
  };
};
