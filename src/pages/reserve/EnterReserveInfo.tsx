import { useLocation } from 'react-router';
import Header2 from '../../shared/components/Header2';
import UserInput from '../../shared/components/UserInput';
import { useSpaceReserveForm } from './hooks/useSpaceReserveForm';
import { useReserveSpace } from './hooks/useReserveSpace';

const EnterReserveInfo = () => {
  const location = useLocation();
  const { date, room, startTime, endTime, spaceId } = location.state as {
    date: string;
    room: { label: string; value: string };
    startTime: string;
    endTime: string;
    spaceId: number;
  };

  const { register, handleSubmit, studentId, name, group, purpose } = useSpaceReserveForm();

  const { reserveSpaceMutation } = useReserveSpace();

  const onSubmitSpaceReserveForm = () => {
    reserveSpaceMutation({
      spaceId: spaceId,
      reservationDate: date, 
      reservationStartTime: startTime, 
      reservationEndTime: endTime, 
      studentNumber: String(studentId), 
      studentName: name, 
      studentGroup: group, 
      reservationPurpose: purpose, 
    });
  };

  return (
    <div className="w-full">
      <Header2 headerContent="예약하기" />

      <div className="flex flex-col px-[16px]">
        <div className="flex flex-col items-start pt-[50px] pb-[24px]">
          <span className="text-[22px] font-[600] text-black">예약정보를 입력해주세요</span>
          <span className="text-[14px] font-[500] text-[#7D7D7D]">
            학번과 이름으로 예약을 조회할 수 있습니다.
          </span>
        </div>

        <span className="mb-[4px] text-[16px] font-[700] text-[#464A4D]">&nbsp;{date}</span>
        <div className="flex gap-[10px]">
          <div className="flex flex-1 items-center gap-[15px] rounded-[10px] border border-[#217446] bg-white px-[20px] py-[13px] text-start">
            <span className="text-[12px] font-[600] text-[#217446]">강의실</span>
            <span className="text-[14px] font-[600]">{room.label}</span>
          </div>
          <div className="flex flex-1 items-center gap-[15px] rounded-[10px] border border-[#217446] bg-white px-[20px] py-[13px] text-start">
            <span className="text-[12px] font-[600] text-[#217446]">시간</span>
            <span className="text-[14px] font-[600]">
              {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
            </span>
          </div>
        </div>

        <div className="mt-[20px] w-full">
          <form
            onSubmit={handleSubmit(onSubmitSpaceReserveForm)}
            className="flex w-full flex-col items-start gap-[20px]"
          >
            <div className="w-full space-y-[15px]">
              <UserInput
                registerName="studentId"
                type="number"
                placeholder="학번을 입력해주세요"
                label="학번"
                register={register}
              />

              <UserInput
                registerName="name"
                placeholder="이름을 입력해주세요"
                label="이름"
                register={register}
              />

              <UserInput
                registerName="group"
                placeholder="소속단체를 입력해주세요"
                label="소속단체"
                register={register}
              />

              <UserInput
                registerName="purpose"
                placeholder="사용목적을 입력해주세요"
                label="사용목적"
                register={register}
              />
            </div>

            <button
              type="submit"
              className={`mt-[49px] w-full rounded-[10px] py-[12px] text-center text-[16px] font-[600] text-white ${!studentId || !name || !group || !purpose ? 'bg-[#E6E6E6]' : 'bg-[#217446]'}`}
              disabled={!studentId || !name || !group || !purpose}
            >
              예약하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterReserveInfo;
