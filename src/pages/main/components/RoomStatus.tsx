import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type RoomStatusProps = {
  roomName: string;
  lockStatus: string;
};

const RoomStatus = ({ roomName, lockStatus }: RoomStatusProps) => {
  // const handleClick = () => {
  //   console.log('개방요청하기 버튼클릭!');
  // };

  return (
    // <div className="flex h-[155px] w-[155px] flex-col items-center rounded-[10px] border border-red-200 bg-red-50 p-[15px] shadow-md">
    <div className="flex w-full items-center justify-between rounded-[10px] border border-gray-200 px-[15px] py-[10px] shadow-[7px]">
      <div className="space-x-[10px]">
        <span className="text-[18px]">
          <FontAwesomeIcon icon="location-dot" className="h-[13px] w-[11px]" /> {roomName}
        </span>
        <button type="button" className={`self-center text-[30px] font-[500] text-red-500`}>
          {lockStatus}
        </button>
      </div>

      <button
        type="button"
        className={`rounded-[6px] border border-[#f2f2f2] bg-green-400 p-[10px] text-[15px] text-white`}
        
      >
        개방 요청하기
      </button>
    </div>
  );
};

export default RoomStatus;
