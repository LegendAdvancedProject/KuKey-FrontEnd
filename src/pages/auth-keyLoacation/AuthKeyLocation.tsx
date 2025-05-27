import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KeyLocationPage = () => {
  const navigate = useNavigate();

  const buildings = ['새천년관', '공학관', '신공학관'];
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0]);

  // 버튼 클릭 핸들러
  const handleClick = (label: string) => {
    console.log(`${label} 클릭!`);
  };

  return (
    <div className="flex flex-col items-center space-y-6 px-4 py-6 text-sm">
      {/* 건물 버튼 */}
      <div className="flex justify-center space-x-4">
        {buildings.map((name) => (
          <button
            key={name}
            className={`rounded border px-4 py-1 font-semibold ${
              selectedBuilding === name
                ? 'bg-green-800 text-white'
                : 'border-green-800 text-green-800'
            } `}
            onClick={() => {
              setSelectedBuilding(name);
              handleClick(name);
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* 제목 */}
      <h2 className="text-lg font-bold text-green-800">관리자용</h2>

      {/* 카드키 사진 + 설명 영역 */}
      <div className="flex justify-center space-x-4">
        <div className="flex h-[180px] w-[140px] items-center justify-center rounded border text-lg font-bold">
          카드키 사진
        </div>
        <div className="flex h-[180px] w-[140px] items-center justify-center rounded border text-lg font-bold">
          내용
        </div>
      </div>

      {/* 기록 추가 버튼 */}
      <div className="flex w-full justify-end pr-1">
        <button
          className="cursor-pointer rounded border px-4 py-1 text-sm hover:bg-green-800 hover:text-white"
          onClick={() => navigate('/register')}
        >
          기록 추가
        </button>
      </div>

      {/* 하단 메뉴 버튼 */}
      <div className="flex w-full justify-between space-x-2 pt-4">
        {['개방관리', '키 관리', '로그아웃'].map((label) => (
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
