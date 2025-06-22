import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchAdminSpaceOpenStatus,
  FetchAdminSpaceOpenStatusResponse,
  openSpace,
} from '../../../shared/apis/admin/spaces/spaces';
import { useState } from 'react';

export const useAdminSpaceManage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalCloseHandler, setModalCloseHandler] = useState<() => void>(() => () => {});
  const [modalConfirmHandler, setModalConfirmHandler] = useState<() => void>(() => () => {});
  const [showCancelButton, setShowCancelButton] = useState(true);

  const { data: currentSpaceStatus, isLoading } = useQuery<FetchAdminSpaceOpenStatusResponse>({
    queryKey: ['openSpace'],
    queryFn: fetchAdminSpaceOpenStatus,
  });

  const { mutate: openSpaceMutation } = useMutation({
    mutationFn: (spaceId: number) => openSpace(spaceId),
    onSuccess: (data) => {
      if (data.code == 200) {
        queryClient.invalidateQueries({ queryKey: ['openSpace'] });
        console.log('개방 상태가 성공적으로 변경됐습니다');
        setModalContent('개방 상태가 성공적으로 변경됐습니다');
        setModalConfirmHandler(() => () => {
          setIsModalOpen(false);
        });
        setModalCloseHandler(() => () => {
          setIsModalOpen(false);
        });
        setShowCancelButton(false);
        setIsModalOpen(true);
        console.log("확인확인")

        // 여기서 openSpaceMutation요청이 'openSpace'라는 쿼리키를 invalidate하므로,
        // currentSpaceStatus라는 GET요청이 다시 요청됨
        // 반대로, currentSpaceStatus는 그냥 GET요청이고, queryClient.invalidateQueries()도 없으니까
        // 이게 실행된다고 openSpaceMutation이 실행되지는 않음
      } else {
        alert('개방 상태 변경 실패');
      }
    },
  });

  return {
    isModalOpen,
    modalContent,
    modalCloseHandler,
    modalConfirmHandler,
    showCancelButton,
    openSpaceMutation,
    currentSpaceStatus,
    isLoading,
  };
};
