import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  OPEN_STATUS,
  OpenStatus,
  REQUEST_OR_RESERVATION_STATUS,
  RequestOrReservationStatus,
} from '../../../shared/constants/spaceStatus';
import { useNavigate } from 'react-router';

type SpaceStatusProps = {
  spaceName: string;
  openStatus: OpenStatus;
  spaceId: number;
  requestOrReservedStatus: RequestOrReservationStatus;
};

const SpaceStatus = ({
  spaceName,
  openStatus,
  // spaceId,
  requestOrReservedStatus,
}: SpaceStatusProps) => {
  let buttonText = '';
  let buttonClass = '';

  if (
    openStatus == OPEN_STATUS.LOCKED &&
    requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.NONE
  ) {
    buttonText = '개방 요청하기';
    buttonClass = 'bg-green-400';
  } else if (
    openStatus == OPEN_STATUS.OPEN &&
    requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.NONE
  ) {
    buttonText = '이용 가능';
    buttonClass = 'bg-blue-400';
  } else if (requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.REQUESTED) {
    buttonText = '개방 요청됨';
    buttonClass = 'bg-yellow-400';
  } else if (requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.ING) {
    buttonText = '이용 중';
    buttonClass = 'bg-gray-400';
  }

  const navigate = useNavigate();

  const handleSpaceButtonClick = () => {
    navigate('/konkuk-student-auth');
  };

  return (
    <div
      className={`flex w-full items-center justify-between rounded-[10px] border border-gray-200 px-[15px] py-[10px] shadow-[7px] ${openStatus == OPEN_STATUS.LOCKED ? 'bg-red-50' : 'bg-blue-50'}`}
    >
      <div className="space-x-[10px]">
        <span className="text-[18px]">
          <FontAwesomeIcon icon="location-dot" className="h-[13px] w-[11px]" /> {spaceName}
        </span>
        <button
          type="button"
          className={`self-center text-[30px] font-[500] ${openStatus == OPEN_STATUS.LOCKED ? 'text-red-500' : 'text-blue-500'}`}
        >
          {openStatus == OPEN_STATUS.LOCKED ? '잠금' : '개방'}
        </button>
      </div>

      {/* 공간이 LOCKED이고 개방 요청이 되지 않았을 때만 버튼 enable */}
      <button
        type="button"
        // buttonClass 적용 안되면 safelist에 등록하기
        className={`rounded-[6px] border border-[#f2f2f2] p-[10px] text-[15px] text-white ${buttonClass}`}
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
    </div>
  );
};

export default SpaceStatus;
