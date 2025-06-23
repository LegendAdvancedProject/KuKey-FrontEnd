import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchKeyInfo, KeyLocationInfo } from '../../shared/apis/admin/key/keyApi';
const KeyLocationPage = () => {
  const navigate = useNavigate();

  const buildings = ['새천년관', '공학관', '신공학관'];
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0]);
  const [keyInfo, setKeyInfo] = useState<KeyLocationInfo | null>(null);

  useEffect(() => {
    const loadKeyInfo = async () => {
      try {
        const info = await fetchKeyInfo(selectedBuilding);
        setKeyInfo(info);
      } catch {
        setKeyInfo(null); // 등록된 정보가 없거나 오류
      }
    };
    loadKeyInfo();
  }, [selectedBuilding]);

  return (
    <div className="flex flex-col items-center space-y-6 px-4 py-6 text-sm">
      {/* 건물 버튼 */}
      <div className="flex h-[36px] w-[358px] shrink-0 items-center justify-center space-x-2 rounded-[8px] bg-[#ECECEC] p-1">
        {buildings.map((name) => (
          <button
            key={name}
            className={`h-full w-1/3 rounded-[8px] px-4 py-[4px] text-xl font-[600] ${
              selectedBuilding === name ? 'bg-white text-[#217446]' : 'bg-[#ECECEC] text-[#6C7072]'
            } `}
            onClick={() => {
              setSelectedBuilding(name);
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* 카드키 사진 + 설명 영역 */}
      <div className="flex flex-col items-center space-y-[10px]">
        <div className="h-[267px] w-[354px] flex-shrink-0 overflow-hidden rounded-[8px] border border-[#E8EEF2] bg-white">
          {keyInfo?.imageUrl ? (
            <img
              src={keyInfo.imageUrl}
              alt="카드키"
              className="h-full w-full rounded object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              카드키 사진
            </div>
          )}
        </div>
        {/* 관리자명 */}
        <div className="w-[354px] pl-2 text-left text-[18px] font-semibold">
          관리자명 : {keyInfo?.adminName ?? ''}
        </div>
        {/* 상세설명 영역 */}
        <div className="h-[172px] w-[358px] flex-shrink-0 rounded-[8px] bg-white p-[10px_14px] text-left text-[15px] font-normal break-words whitespace-pre-wrap">
          {keyInfo?.description ?? ''}
        </div>
      </div>

      {/* 기록 추가 버튼 */}
      <div className="flex h-[48px] w-[359px] justify-center rounded-[10px] bg-[#217446] text-white">
        <button
          className="cursor-pointer text-sm text-[16px]"
          onClick={() => navigate('/register', { state: { buildingName: selectedBuilding } })}
        >
          정보 업데이트
        </button>
      </div>
    </div>
  );
};

export default KeyLocationPage;
