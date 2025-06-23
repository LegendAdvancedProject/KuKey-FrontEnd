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

  // 버튼 클릭 핸들러
  const handleClick = (label: string) => {
    console.log(`${label} 클릭!`);
  };

  return (
    <div className="flex flex-col items-center space-y-6 px-4 py-6 text-sm">
      {/* 건물 버튼 */}
      <div className="flex h-[36px] w-[358px] shrink-0 items-center justify-center space-x-2 rounded-[8px] bg-[#ECECEC] p-1">
        {buildings.map((name) => (
          <button
            key={name}
            className={`h-full w-1/3 rounded-[8px] px-4 py-[4px] text-sm font-semibold ${
              selectedBuilding === name ? 'bg-white text-black' : 'bg-[#ECECEC] text-black'
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
      <div className="flex justify-center space-x-4">
        <div className="flex h-[180px] w-[140px] items-center justify-center rounded border text-lg font-bold">
          {keyInfo?.imageUrl ? (
            <img
              src={keyInfo.imageUrl}
              alt="카드키"
              className="h-full w-full rounded object-cover"
            />
          ) : (
            '카드키 사진'
          )}
        </div>
        <div className="flex h-[180px] w-[140px] flex-col items-center justify-center rounded border text-sm font-semibold">
          <span className="w-[130px] break-words whitespace-normal">
            관리자명 : {keyInfo?.adminName ?? ''}
          </span>
          <span className="w-[130px] break-words whitespace-normal">
            세부내용 : {keyInfo?.description ?? ''}
          </span>
        </div>
      </div>

      {/* 기록 추가 버튼 */}
      <div className="flex w-full justify-end pr-1">
        <button
          className="cursor-pointer rounded border px-4 py-1 text-sm hover:bg-green-800 hover:text-white"
          onClick={() => navigate('/register', { state: { buildingName: selectedBuilding } })}
        >
          기록 추가
        </button>
      </div>

      {/* 하단 메뉴 버튼 */}
      <div className="flex w-full justify-between space-x-2 pt-4">
        {['개방관리', '키 관리'].map((label) => (
          <button
            key={label}
            className="w-full cursor-pointer rounded border border-green-800 py-1 font-semibold text-green-800 hover:bg-green-800 hover:text-white"
            onClick={() => handleClick(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeyLocationPage;
