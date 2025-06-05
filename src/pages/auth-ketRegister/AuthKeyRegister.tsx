import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadKeyImage, uploadKeyInfo } from '../../shared/apis/key/keyapi';

const KeyRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const buildingName = location.state?.buildingName || '새천년관';

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
    <div className="flex flex-col space-y-4 p-6 text-sm">
      {/* 입력 필드 */}
      <div className="flex items-center space-x-4">
        <label className="w-[80px] font-semibold">관리자명</label>
        <input
          type="text"
          className="w-full rounded border px-2 py-1"
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
  );
};

export default KeyRegisterPage;
