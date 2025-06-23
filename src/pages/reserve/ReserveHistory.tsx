import { useEffect, useState } from 'react';
import axios from 'axios';
import Header2 from '../../shared/components/Header2';

const ReserveHistory = () => {
  const [data, setData] = useState({
    studentId: '',
    name: '',
    place: '',
    time: '',
    organization: '',
    purpose: '',
  });

  useEffect(() => {
    // TODO: API 주소에 맞게 수정예정
    axios
      .get('/api/reservation')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-[30px]">
      <Header2 headerContent="예약조회" />
      <div className="w-full px-4 py-6">
        {/* 학생정보 박스 */}
        <div className="mb-2 pl-[2px] text-[14px] leading-[20px] font-bold text-[#464A4D]">
          학생정보
        </div>
        <div className="flex h-[47px] flex-col items-center justify-center gap-[10px] rounded-[8px] bg-white px-[28px]">
          <div className="flex items-center gap-[67px]">
            <div className="flex flex-col items-start">
              <span className="text-[12px] leading-[16px] font-[600] text-[#217446]">학번</span>
              <span className="text-[16px] leading-[16px] font-[600] text-black">
                {data.studentId}
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[12px] leading-[16px] font-[600] text-[#217446]">이름</span>
              <span className="text-[16px] leading-[16px] font-[600] text-black">{data.name}</span>
            </div>
          </div>
        </div>

        {/* 정보 항목들 */}
        <div className="mt-6 flex flex-col gap-4">
          {[
            { label: '장소', value: data.place },
            { label: '시간', value: data.time },
            { label: '소속단체', value: data.organization },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="pl-[2px] text-[14px] leading-[20px] font-bold text-[#464A4D]">
                {label}
              </div>
              <div className="flex h-[46px] w-[358px] items-start gap-[10px] rounded-[8px] bg-white px-[14px] py-[10px]">
                {value}
              </div>
            </div>
          ))}

          {/* 사용목적 */}
          <div>
            <div className="pl-[2px] text-[14px] leading-[20px] font-bold text-[#464A4D]">
              사용목적
            </div>
            <div className="flex h-[92px] w-[358px] items-start gap-[10px] rounded-[8px] bg-white px-[14px] py-[10px]">
              {data.purpose}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveHistory;
