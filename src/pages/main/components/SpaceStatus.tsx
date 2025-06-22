import {
  OPEN_STATUS,
  OpenStatus,
  REQUEST_OR_RESERVATION_STATUS,
  RequestOrReservationStatus,
} from '../../../shared/constants/spaceStatus';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import CustomModal from '../../../shared/components/CustomModal';

type SpaceStatusProps = {
  spaceName: string;
  openStatus: OpenStatus;
  spaceId: number;
  requestOrReservedStatus: RequestOrReservationStatus;
};

const SpaceStatus = ({
  spaceName,
  openStatus,
  spaceId,
  requestOrReservedStatus,
}: SpaceStatusProps) => {
  let buttonText = '';
  let buttonTextColor = '';
  let buttonBgColor = '';
  let img = '';

  if (
    openStatus == OPEN_STATUS.LOCKED &&
    requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.NONE
  ) {
    buttonText = '개방 요청';
    buttonTextColor = 'text-white';
    buttonBgColor = 'bg-[#217446]';
    img = '/locked.svg';
  } else if (
    openStatus == OPEN_STATUS.OPEN &&
    requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.NONE
  ) {
    buttonText = '이용 가능';
    buttonTextColor = 'text-white';
    buttonBgColor = 'bg-blue-400';
    img = '/open.svg';
  } else if (requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.REQUESTED) {
    buttonText = '요청 완료';
    buttonTextColor = 'text-[#3C9E68]';
    buttonBgColor = 'bg-[#CCF0DC]';
    img = '/locked.svg';
  } else if (requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.ING) {
    buttonText = '이용 중';
    buttonTextColor = 'text-white';
    buttonBgColor = 'bg-yellow-400';
    img = '/open.svg';
  }

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleConfirm = () => {
    navigate('/konkuk-student-auth', { state: { spaceId } });
  };

  const handleSpaceButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className={`mb-[10px] flex w-full items-center justify-between rounded-[12px] border border-gray-300 bg-white px-[16px] py-[12px]`}
    >
      <div className="flex items-center gap-[16px]">
        <img src={img} alt="잠금 아이콘" className="h-[38px] w-[38px]" />
        <button type="button" className={`text-[14px] font-[600] text-[#454A4D]`} disabled={true}>
          {spaceName}
        </button>
      </div>

      {/* 공간이 LOCKED이고 개방 요청이 되지 않았을 때만 버튼 enable */}
      <button
        type="button"
        // buttonClass 적용 안되면 safelist에 등록하기
        className={`rounded-[48px] text-center px-[16px] py-[8px] text-[14px] font-[600] w-[] ${buttonBgColor} ${buttonTextColor}`}
        disabled={
          !(
            openStatus == OPEN_STATUS.LOCKED &&
            requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.NONE
          )
        }
        onClick={handleSpaceButtonClick}
      >
        {buttonText}
      </button>

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={`${spaceName} 개방을 요청하시겠어요?`}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default SpaceStatus;
