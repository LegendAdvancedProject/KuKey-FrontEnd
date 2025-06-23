import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';
import { ADMIN_ACCESS_TOKEN } from '../../constants/storageKey';
import { useState } from 'react';
import CustomModal from '../CustomModal';

const AdminHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleConfirm = () => {
    localStorage.removeItem(ADMIN_ACCESS_TOKEN);
    navigate('/');
  };

  return (
    <header className="flex w-full justify-between bg-[#217446] px-[15px] py-[13px] text-white">
      <div className="flex items-baseline gap-[10px]">
        <span className="text-[20px] font-[800]">KuKey</span>
        <span className="text-[16px] font-[600]">Admin</span>
      </div>
      <button type="button" className="" onClick={() => setIsModalOpen(true)}>
        <FontAwesomeIcon icon="user" size="2x" />
      </button>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content="로그아웃 하시겠어요?"
        onConfirm={handleConfirm}
        showCancelButton={true}
      />
    </header>
  );
};

export default AdminHeader;
