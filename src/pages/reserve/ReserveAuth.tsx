import UserInput from '../../shared/components/UserInput';
import Header2 from '../../shared/components/Header2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

type ReserveHistoryInputs = {
  studentId: number;
  name: string;
};

const ReserveAuth = () => {
  const { register, handleSubmit, watch } = useForm<ReserveHistoryInputs>({ mode: 'onChange' });

  const studentId = watch('studentId');
  const name = watch('name');
  const navigate = useNavigate();

  const onSubmitReserveHistoryForm = () => {
    navigate('/reserve-history', {
      state: {
        studentId: studentId,
        name: name,
      },
    });
  };

  return (
    <div className="w-full">
      <Header2 headerContent="예약조회" />

      <div className="flex flex-col items-start px-[16px] pt-[50px] pb-[24px]">
        <span className="text-[22px] font-[600] text-black">예약 조회</span>
        <span className="text-[14px] font-[500] text-[#7D7D7D]">
          시설 예약 시 사용했던 학번과 이름을 입력해주세요.
        </span>
      </div>

      <div className="w-full px-[16px] pt-[16px] pb-[50px]">
        <form
          onSubmit={handleSubmit(onSubmitReserveHistoryForm)}
          className="flex w-full flex-col items-start gap-[20px]"
        >
          <div className="w-full">
            <UserInput
              registerName="studentId"
              type="number"
              placeholder="학번을 입력해주세요"
              label="학번"
              register={register}
              rules={{
                required: '학번을 입력해주세요.',
              }}
            />
          </div>

          <div className="w-full">
            <UserInput
              registerName="name"
              label="이름"
              placeholder="이름을 입력해주세요"
              register={register}
              rules={{
                required: '이름을 입력해주세요.',
              }}
            />
          </div>

          <button
            type="submit"
            className={`mt-[49px] w-full rounded-[10px] py-[12px] text-center text-[16px] font-[600] text-white ${!studentId || !name ? 'bg-[#E6E6E6]' : 'bg-[#217446]'}`}
            disabled={!studentId || !name}
          >
            조회하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReserveAuth;
