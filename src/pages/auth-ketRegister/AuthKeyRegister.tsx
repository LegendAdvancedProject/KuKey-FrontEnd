import { useNavigate } from 'react-router-dom';

const KeyRegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-4 p-6 text-sm">
      {/* 입력 필드 */}
      <div className="flex items-center space-x-4">
        <label className="w-[80px] font-semibold">관리자명</label>
        <input type="text" className="w-full rounded border px-2 py-1" />
      </div>

      <div className="flex items-center space-x-4">
        <label className="w-[80px] font-semibold">사진</label>
        <input type="file" className="rounded border px-2 py-1" />
      </div>

      <div className="flex items-start space-x-4">
        <label className="w-[80px] pt-2 font-semibold">설명</label>
        <textarea className="h-[100px] w-full rounded border px-2 py-1" />
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-between space-x-4 pt-4">
        <button
          className="w-full rounded border border-green-800 py-2 font-semibold text-green-800"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
        <button className="w-full rounded bg-green-800 py-2 font-semibold text-white">등록</button>
      </div>
    </div>
  );
};

export default KeyRegisterPage;
