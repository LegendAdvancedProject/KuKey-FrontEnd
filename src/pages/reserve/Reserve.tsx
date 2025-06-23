import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { format } from 'date-fns';
import Dropdown from './components/Dropdown';
import {
  fetchSpaceReserveStatus,
  ReservationResponse,
} from '../../shared/apis/user/reserve/reserve';
import { useQuery } from '@tanstack/react-query';

const roomOptions = [
  { label: '과방1', value: '과방1' },
  { label: '과방2', value: '과방2' },
  { label: '1013호', value: '1013호' },
  { label: '1014호', value: '1014호' },
  { label: '501호', value: '501호' },
];

// 시설예약 탭
const Reserve = () => {
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [formattedDate, setFormattedDate] = useState(formattedToday);
  const [selectedRoom, setSelectedRoom] = useState(roomOptions[0]);

  const navigate = useNavigate();
  const handleLogClick = () => {
    navigate('/');
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
      alert('최대 2시간까지 선택 가능합니다.');
      return;
    }

    const allSelected = [...selectedTimes, time].sort();
    const [t1, t2] = allSelected;

    if (allSelected.length === 2) {
      const h1 = parseInt(t1.split(':')[0]);
      const h2 = parseInt(t2.split(':')[0]);
      if (h2 - h1 !== 1) {
        alert('연속된 시간만 선택할 수 있습니다.');
        return;
      }
    }

    setSelectedTimes(allSelected);
    setReservationStartTime(`${allSelected[0]}:00`);
    const lastHour = parseInt(allSelected[allSelected.length - 1].split(':')[0]) + 1;
    setReservationEndTime(`${lastHour.toString().padStart(2, '0')}:00`);
  };

  // 예약 불가 여부 확인
  const isUnavailable = (time: string) => {
    const roomList = spaceReserveStatus?.reservationList;
    if (!roomList) return false;

    const target = roomList.find((room) => room.spaceDisplayName === selectedRoom.label);
    return target?.unavailableReservationTimeList.some((t) => t.startTime === time) ?? false;
  };

  const handleReserveBtnClick = () => {

  }

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
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy. MM. dd"
          className="w-full rounded-[10px] bg-white py-[10px] pl-[18px] text-[18px] font-[500]"
          wrapperClassName="w-full"
        />
      </div>

      <div className="mt-[17px] flex w-full flex-col items-start">
        <span className="mb-[10px] text-[14px] font-[600]">예약 공간</span>
        <Dropdown options={roomOptions} selected={selectedRoom} onSelect={setSelectedRoom} />
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
    </div>
  );
};

export default Reserve;
