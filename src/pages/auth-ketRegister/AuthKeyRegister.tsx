import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadKeyImage, uploadKeyInfo } from '../../shared/apis/admin/key/keyApi';
import AdminHeader from '../../shared/components/Admin/AdminHeader';
import AdminNavigationBar from '../../shared/components/Admin/AdminNavigationBar';

const KeyRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const buildingName = location.state?.buildingName || '새천년관';
  const [selected, setSelected] = useState<'space' | 'key'>('key');

  const [adminName, setAdminName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file || !adminName || !description) return alert('모든 항목을 입력해주세요.');

    try {
      const imageUrl = await uploadKeyImage(file);
      await uploadKeyInfo({
        buildingName,
        adminName,
        imageUrl,
        description,
      });
      alert('등록 완료!');
      navigate(-1);
    } catch (err) {
      if (err instanceof Error) {
        alert('등록 실패: ' + err.message);
      } else {
        alert('등록 실패: 알 수 없는 오류');
      }
    }
  };

  return (
    <div className="flex w-full flex-col">
      {/* 공통 레이아웃 구성요소 */}
      <AdminHeader />
      <AdminNavigationBar selected={selected} setSelected={setSelected} />
      {/* 본문 */}
      <main className="flex flex-col items-center space-y-6 px-4 py-6 text-sm">
        {/* 건물 이름 상단 표시 */}
        <div className="flex h-[36px] w-[358px] shrink-0 items-center justify-center space-x-2 rounded-[8px] bg-[#ECECEC] p-1">
          {['새천년관', '공학관', '신공학관'].map((name) => (
            <button
              key={name}
              className={`h-full w-1/3 rounded-[8px] px-4 py-[4px] text-xl font-[600] ${
                buildingName === name ? 'bg-white text-[#217446]' : 'bg-[#ECECEC] text-[#6C7072]'
              }`}
              disabled
            >
              {name}
            </button>
          ))}
        </div>
      </main>
      <div className="flex flex-col space-y-4 p-6 text-sm">
        {/* 입력 필드 */}
        <div className="flex flex-col space-y-2">
          <label className="w-[80px] text-[14px] leading-[20px] font-bold text-[#464A4D]">
            관리자명
          </label>
          <input
            type="text"
            placeholder="내용을 입력해주세요."
            className="h-[50px] w-[358px] rounded-[8px] border border-[#E8EEF2] bg-white px-[14px] py-[13px] text-sm text-[14px] placeholder:text-[#CBD2D9]"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-[80px] font-semibold">사진</label>
          <input
            type="file"
            className="rounded border px-2 py-1"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setFile(f);
            }}
          />
        </div>

        <div className="flex items-start space-x-4">
          <label className="w-[80px] pt-2 font-semibold">설명</label>
          <textarea
            className="h-[100px] w-full rounded border px-2 py-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-between space-x-4 pt-4">
          <button
            className="w-full rounded border border-green-800 py-2 font-semibold text-green-800"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
          <button
            className="w-full rounded bg-green-800 py-2 font-semibold text-white"
            onClick={handleSubmit}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyRegisterPage;
