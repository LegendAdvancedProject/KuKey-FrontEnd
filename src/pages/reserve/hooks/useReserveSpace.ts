import { useMutation } from '@tanstack/react-query';
import { reserveSpace } from '../../../shared/apis/user/reserve/reserve';
import { useNavigate } from 'react-router';

export const useReserveSpace = () => {
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
        console.log('예약 성공');
        navigate('/');
      } else {
        console.log(data);
      }
    },
    onError: () => {
      console.log('실패2');
    },
  });

  return { reserveSpaceMutation };
};
