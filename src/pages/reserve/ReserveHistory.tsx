import { useState } from 'react';
import Header2 from '../../shared/components/Header2';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomModal from '../../shared/components/CustomModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReservationHistoryResponse, reserveHistory } from '../../shared/apis/user/reserve/reserve';
import apiClient from '../../shared/apis/apiClient';

const ReserveHistory = () => {
  const deleteReservation = (reservationId: number) => {
    return apiClient.delete(`/reservations/${reservationId}`);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { studentId, name } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);

  const { data, isLoading } = useQuery<ReservationHistoryResponse>({
    queryKey: ['userReserveHistory', studentId, name],
    queryFn: () => reserveHistory(studentId, name),
    enabled: !!studentId && !!name,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userReserveHistory', studentId, name] });
      setIsModalOpen(false);
    },
  });

  if (isLoading) return <div>로딩 중...</div>;

  const studentNumber = data?.data?.studentNumber ?? '';
  const studentName = data?.data?.studentName ?? '';
  const reservationList = data?.data?.reservationList ?? [];

  return (
    <div className="max-h-screen space-y-[30px] overflow-y-auto">
      <Header2 headerContent="예약조회" />
      <div className="w-full px-4">
        {/* 학생정보 */}
        <div className="mb-2 pl-[2px] text-[14px] font-bold text-[#464A4D]">학생정보</div>
        <div className="flex h-[47px] items-center justify-center gap-[10px] rounded-[8px] bg-white px-[28px]">
          <div className="flex items-center gap-[80px]">
            <div className="flex items-center gap-[15px]">
              <span className="text-[12px] font-[600] text-[#217446]">학번</span>
              <span className="text-[16px] font-[600] text-black">{studentNumber}</span>
            </div>
            <div className="flex items-center gap-[15px]">
              <span className="text-[12px] font-[600] text-[#217446]">이름</span>
              <span className="text-[16px] font-[600] text-black">{studentName}</span>
            </div>
          </div>
        </div>

        {/* 예약 내역 */}
        <div className="mt-6 flex flex-col gap-6">
          {reservationList.length === 0 ? (
            <div className="flex h-[540px] items-center justify-center text-[16px] font-[500] text-gray-500">
              예약 정보가 없습니다.
            </div>
          ) : (
            reservationList.map((reservation) => (
              <button
                key={reservation.reservationId}
                className="flex flex-col space-y-3 rounded-[12px] bg-white p-4 text-left shadow-sm"
                onClick={() => {
                  setSelectedReservationId(reservation.reservationId);
                  setIsModalOpen(true);
                }}
              >
                <div>
                  <span className="text-[14px] font-bold text-[#464A4D]">장소</span>
                  <div className="mt-1 text-[14px] font-[500] text-gray-500">
                    {reservation.spaceDisplayName}
                  </div>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#464A4D]">시간</span>
                  <div className="mt-1 text-[14px] font-[500] text-gray-500">
                    {reservation.reservationDate} / {reservation.reservationStartTime.slice(0, 5)} -{' '}
                    {reservation.reservationEndTime.slice(0, 5)}
                  </div>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#464A4D]">소속단체</span>
                  <div className="mt-1 text-[14px] font-[500] text-gray-500">
                    {reservation.studentGroup}
                  </div>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#464A4D]">사용 목적</span>
                  <div className="mt-1 text-[14px] font-[500] whitespace-pre-wrap text-gray-500">
                    {reservation.reservationPurpose}
                  </div>
                </div>
                <div className="flex justify-end">
                  <span className="text-[13px] font-[600] text-red-500">예약 취소하기</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="mx-auto mb-[15px] flex w-[360px] justify-center space-x-4">
        {/* <button
          onClick={() => {
            setSelectedReservationId(null); // 아무것도 선택 안 된 상태로 초기화
            setIsModalOpen(true); // 전체 예약 취소는 아니지만 유지하고 싶다면 조건 추가 가능
          }}
          className="h-[48px] w-[171px] rounded-[10px] bg-[#ECECEC] py-2 text-[16px] font-[600] text-[#929292]"
        >
          예약취소
        </button> */}
        <button
          onClick={() => navigate('/')}
          className="h-[48px] w-[171px] rounded-[10px] bg-[#217446] py-2 text-[16px] font-[600] text-white"
        >
          확인
        </button>
      </div>

      {/* 모달 */}
      <CustomModal
        isOpen={isModalOpen}
        content="해당 예약을 취소하시겠습니까?"
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReservationId(null);
        }}
        onConfirm={() => {
          if (selectedReservationId) deleteMutation.mutate(selectedReservationId);
        }}
      />
    </div>
  );
};

export default ReserveHistory;
