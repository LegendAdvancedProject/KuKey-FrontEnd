import { useMutation } from '@tanstack/react-query';
import { reserveSpace } from '../../../shared/apis/user/reserve/reserve';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export const useReserveSpace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalConfirmHandler, setModalConfirmHandler] = useState<() => void>(() => () => {});
  const [showCancelButton, setShowCancelButton] = useState(true);

  const navigate = useNavigate();
  const { mutate: reserveSpaceMutation } = useMutation({
    mutationFn: ({
      spaceId,
      reservationDate,
      reservationStartTime,
      reservationEndTime,
      studentNumber,
      studentName,
      studentGroup,
      reservationPurpose,
    }: {
      spaceId: number;
      reservationDate: string;
      reservationStartTime: string;
      reservationEndTime: string;
      studentNumber: string;
      studentName: string;
      studentGroup: string;
      reservationPurpose: string;
    }) =>
      reserveSpace(
        spaceId,
        reservationDate,
        reservationStartTime,
        reservationEndTime,
        studentNumber,
        studentName,
        studentGroup,
        reservationPurpose
      ),
    onSuccess: (data) => {
      if (data.code == 200) {
        setModalContent('예약이 완료되었습니다');
        setModalConfirmHandler(() => () => {
          navigate('/');
          setIsModalOpen(false);
        });
        setShowCancelButton(false);
        setIsModalOpen(true);
      } else {
        setModalContent(data.message);
        setModalConfirmHandler(() => () => {
          setIsModalOpen(false);
        });
        setShowCancelButton(false);
        setIsModalOpen(true);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { isModalOpen, modalContent, modalConfirmHandler, showCancelButton, reserveSpaceMutation };
};
