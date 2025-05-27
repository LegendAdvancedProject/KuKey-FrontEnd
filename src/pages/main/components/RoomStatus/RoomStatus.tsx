type RoomStatusProps = {
  roomName: string;
  lockStatus: string;
};

const RoomStatus = ({ roomName, lockStatus }: RoomStatusProps) => {
  const handleClick = () => {
    console.log('개방요청하기 버튼클릭!');
    console.log('변경사항');
  };

  return (
    <div className="bg-beige flex h-[200px] w-[200px] flex-col border-[3px] border-black">
      <div className="flex w-full justify-center pt-[10px] text-[20px] text-green-600">
        {roomName}
      </div>
      <div
        className={`flex w-full justify-center pt-[20px] text-[40px] ${
          lockStatus === '잠금' ? 'text-red-600' : 'text-blue-600'
        }`}
      >
        {lockStatus}
      </div>
      <button
        className="flex cursor-pointer justify-center pt-[30px] text-[20px] text-green-600"
        onClick={handleClick}
      >
        개방 요청하기
      </button>
    </div>
  );
};

export default RoomStatus;
