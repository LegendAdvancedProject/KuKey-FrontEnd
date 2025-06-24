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

const AdminSpaceStatus = ({
  spaceName,
  openStatus,
  spaceId,
  requestOrReservedStatus,
  openSpaceMutation,
}: SpaceStatusProps) => {
  let buttonText = '';
  let buttonTextColor = '';
  let buttonBgColor = '';
  let img = '';

  if (
    openStatus == OPEN_STATUS.LOCKED &&
    requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.NONE
  ) {
    buttonText = '잠금 상태';
    buttonTextColor = 'text-[#3C9E68]';
    buttonBgColor = 'bg-[#CCF0DC]';
    img = '/locked.svg';
  } else if (
    openStatus == OPEN_STATUS.OPEN &&
    requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.NONE
  ) {
    buttonText = '개방 완료';
    buttonTextColor = 'text-white';
    buttonBgColor = 'bg-blue-400';
    img = '/open.svg';
  } else if (requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.REQUESTED) {
    buttonText = '개방 요청됨';
    buttonTextColor = 'text-white';
    buttonBgColor = 'bg-[#217446]';
    img = '/locked.svg';
  } else if (requestOrReservedStatus === REQUEST_OR_RESERVATION_STATUS.ING) {
    buttonText = '이용 가능';
    buttonTextColor = 'text-white';
    buttonBgColor = 'bg-blue-400';
    img = '/open.svg';
  }

  const handleOpenClick = () => {
    openSpaceMutation(spaceId); // 개방 상태 변경 api
    // querykey invalidate로 개방 상태 조회 api(currentSpaceStatus)도 자동 호출됨
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
        className={`w-[] rounded-[48px] px-[16px] py-[8px] text-center text-[14px] font-[600] ${buttonBgColor} ${buttonTextColor}`}
        onClick={handleOpenClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AdminSpaceStatus;
