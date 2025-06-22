import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  OPEN_STATUS,
  OpenStatus,
  REQUEST_OR_RESERVATION_STATUS,
  RequestOrReservationStatus,
} from '../../../shared/constants/spaceStatus';

type SpaceStatusProps = {
  spaceName: string;
  openStatus: OpenStatus;
  spaceId: number;
  requestOrReservedStatus: RequestOrReservationStatus;
  openSpaceMutation: (spaceId: number) => void;
};

const SpaceStatus = ({
  spaceName,
  openStatus,
  spaceId,
  requestOrReservedStatus,
  openSpaceMutation,
}: SpaceStatusProps) => {
  let buttonText = '';
  let buttonClass = '';

  if (
    openStatus == OPEN_STATUS.LOCKED &&
    requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.NONE
  ) {
    buttonText = '잠금 상태';
    buttonClass = 'bg-yellow-400';
  } else if (
    openStatus == OPEN_STATUS.OPEN &&
    requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.NONE
  ) {
    buttonText = '개방 완료';
    buttonClass = 'bg-blue-400';
  } else if (requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.REQUESTED) {
    buttonText = '개방 요청됨';
    buttonClass = 'bg-green-400';
  } else if (requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.ING) {
    buttonText = '이용 중';
    buttonClass = 'bg-gray-400';
  }

  const handleOpenClick = () => {
    openSpaceMutation(spaceId); // 개방 상태 변경 api
    // querykey invalidate로 개방 상태 조회 api(currentSpaceStatus)도 자동 호출됨
  };

  return (
    <div
      className={`flex w-full items-center justify-between rounded-[10px] border border-gray-300 px-[15px] py-[10px] shadow-[7px] ${openStatus == OPEN_STATUS.LOCKED ? 'bg-red-50' : 'bg-blue-50'}`}
    >
      <div className="space-x-[10px]">
        <span className="text-[18px]">
          <FontAwesomeIcon icon="location-dot" className="h-[13px] w-[11px]" /> {spaceName}
        </span>
        <button
          type="button"
          className={`self-center text-[30px] font-[500] ${openStatus == OPEN_STATUS.LOCKED ? 'text-red-500' : 'text-blue-500'}`}
          onClick={handleOpenClick}
        >
          {openStatus == OPEN_STATUS.LOCKED ? '개방하기' : '잠그기'}
        </button>
      </div>

      {/* 공간이 LOCKED이고 개방 요청이 되지 않았을 때만 버튼 enable */}
      <button
        type="button"
        // buttonClass 적용 안되면 safelist에 등록하기
        className={`rounded-[6px] border border-[#f2f2f2] p-[10px] text-[15px] text-white ${buttonClass}`}
        disabled={true}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SpaceStatus;
