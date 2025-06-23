import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { addMonths, format } from 'date-fns';
import Dropdown from './components/Dropdown';
import {
  fetchSpaceReserveStatus,
  ReservationResponse,
} from '../../shared/apis/user/reserve/reserve';
import { useQuery } from '@tanstack/react-query';
import CustomModal from '../../shared/components/CustomModal';

const roomOptions = [
  { label: '과방1', value: '과방1' },
  { label: '과방2', value: '과방2' },
  { label: '1013호', value: '1013호' },
  { label: '1014호', value: '1014호' },
  { label: '501호', value: '501호' },
];

// 시설예약 탭
const Reserve = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalConfirmHandler, setModalConfirmHandler] = useState<() => void>(() => () => {});
  const [showCancelButton, setShowCancelButton] = useState(true);

  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');
  const oneMonthLater = addMonths(today, 1);

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [formattedDate, setFormattedDate] = useState(formattedToday);
  const [selectedRoom, setSelectedRoom] = useState(roomOptions[0]);

  const navigate = useNavigate();
  const handleLogClick = () => {
    navigate('/reserve-auth');
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formatted = format(date, 'yyyy-MM-dd');
      setFormattedDate(formatted);
    }
  };

  const { data: spaceReserveStatus, isLoading } = useQuery<ReservationResponse>({
    queryKey: ['spaceReserveStatus', formattedDate],
    queryFn: () => fetchSpaceReserveStatus(formattedDate),
    enabled: !!formattedDate, // 빈 문자열일 때 호출 막기
  });

  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 10;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const [reservationStartTime, setReservationStartTime] = useState<string | null>(null);
  const [reservationEndTime, setReservationEndTime] = useState<string | null>(null);

  // 선택 토글 함수
  const toggleTime = (time: string) => {
    const isToday = (date: Date | null) => {
      if (!date) return false;
      const now = new Date();
      return (
        now.getFullYear() === date.getFullYear() &&
        now.getMonth() === date.getMonth() &&
        now.getDate() === date.getDate()
      );
    };

    if (isToday(selectedDate)) {
      setModalContent('당일 예약은 불가능합니다.');
      setModalConfirmHandler(() => () => setIsModalOpen(false));
      setShowCancelButton(false);
      setIsModalOpen(true);
      return;
    }

    // 기존 로직 유지
    if (selectedTimes.includes(time)) {
      const newTimes = selectedTimes.filter((t) => t !== time);
      setSelectedTimes(newTimes);

      if (newTimes.length === 0) {
        setReservationStartTime(null);
        setReservationEndTime(null);
      } else {
        setReservationStartTime(`${newTimes[0]}:00`);
        const lastHour = parseInt(newTimes[newTimes.length - 1].split(':')[0]) + 1;
        setReservationEndTime(`${lastHour.toString().padStart(2, '0')}:00`);
      }

      return;
    }

    if (selectedTimes.length >= 2) {
      setModalContent('최대 2시간까지 예약 가능합니다.');
      setModalConfirmHandler(() => () => setIsModalOpen(false));
      setShowCancelButton(false);
      setIsModalOpen(true);
      return;
    }

    const allSelected = [...selectedTimes, time].sort();
    const [t1, t2] = allSelected;

    if (allSelected.length === 2) {
      const h1 = parseInt(t1.split(':')[0]);
      const h2 = parseInt(t2.split(':')[0]);
      if (h2 - h1 !== 1) {
        setModalContent('연속된 시간만 선택 가능합니다.');
        setModalConfirmHandler(() => () => setIsModalOpen(false));
        setShowCancelButton(false);
        setIsModalOpen(true);
        return;
      }
    }

    setSelectedTimes(allSelected);
    setReservationStartTime(`${allSelected[0]}:00`);
    const lastHour = parseInt(allSelected[allSelected.length - 1].split(':')[0]) + 1;
    setReservationEndTime(`${lastHour.toString().padStart(2, '0')}:00:00`);
  };

  // 예약 불가 여부 확인
  const isUnavailable = (time: string) => {
    const roomList = spaceReserveStatus?.data?.reservationList;
    if (!roomList) return false;

    const target = roomList.find((room) => room.spaceDisplayName === selectedRoom.label);
    if (!target) return false;

    return target.unavailableReservationTimeList.some((t) => {
      const result = time >= t.startTime && time < t.endTime;
      return result;
    });
  };

  const handleReserveBtnClick = () => {
    if (!reservationStartTime || !reservationEndTime) return;

    const spaceId = roomOptions.findIndex((room) => room.value === selectedRoom.value) + 1;
    navigate('/student-reserve-auth', {
      state: {
        date: formattedDate,
        room: selectedRoom,
        startTime: reservationStartTime,
        endTime: reservationEndTime,
        spaceId: spaceId,
      },
    });
  };

  return (
    <div className="flex w-full flex-col px-[16px]">
      <div className="flex justify-between pt-[30px] pb-[26px]">
        <div className="flex flex-col items-start">
          <span className="text-[22px] font-[600] text-black">예약 정보를 선택해주세요</span>
          <span className="text-[14px] font-[500] text-[#7D7D7D]">
            예약 내역이 있다면, 우측 버튼으로 확인할 수 있어요.
          </span>
        </div>

        <button type="button" onClick={handleLogClick}>
          <img src="/log.svg" alt="예약 내역 확인" />
        </button>
      </div>

      <div className="flex w-full flex-col items-start">
        <span className="mb-[10px] text-[14px] font-[600]">예약 날짜</span>
        <div className="relative w-full">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy. MM. dd"
            minDate={today}
            maxDate={oneMonthLater}
            className="w-full rounded-[10px] bg-white py-[14px] pl-[20px] text-[18px] font-[500]" // 여기는 입력창
            wrapperClassName="w-full"
          />
          <img
            src="/chevron-down.svg"
            alt="펼쳐보기"
            className="absolute top-1/2 right-[10px] -translate-y-1/2"
          />
        </div>
      </div>

      <div className="mt-[17px] flex w-full flex-col items-start">
        <span className="mb-[10px] text-[14px] font-[600]">예약 공간</span>
        <div className="relative w-full">
          <Dropdown options={roomOptions} selected={selectedRoom} onSelect={setSelectedRoom} />
          <img
            src="/chevron-down.svg"
            alt="펼쳐보기"
            className="absolute top-1/2 right-[10px] -translate-y-1/2"
          />
        </div>
      </div>

      <div className="mt-[17px] flex w-full flex-col items-start">
        <span className="mb-[10px] text-[14px] font-[600]">예약 시간</span>

        {!isLoading && (
          <div className="w-full rounded-[8px]">
            <div className="grid grid-cols-4 gap-2 rounded-xl bg-white p-3">
              {timeSlots.map((time) => {
                const unavailable = isUnavailable(time);
                const selected = selectedTimes.includes(time);

                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => !unavailable && toggleTime(time)}
                    disabled={unavailable}
                    className={`rounded-[8px] py-[10px] text-[14px] font-[600] ${
                      unavailable
                        ? 'bg-[#E0E0E0] text-[#A0A0A0]'
                        : selected
                          ? 'bg-[#217446] text-white'
                          : 'border border-[#DADADA] text-black'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className={`mt-[35px] w-full rounded-[10px] py-[12px] text-center text-[16px] font-[600] text-white ${!reservationStartTime || !reservationEndTime ? 'bg-[#E6E6E6]' : 'bg-[#217446]'}`}
        onClick={handleReserveBtnClick}
      >
        예약하기
      </button>

      <CustomModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={modalConfirmHandler}
        onConfirm={modalConfirmHandler}
        showCancelButton={showCancelButton}
      />
    </div>
  );
};

export default Reserve;
