// 개방조회 탭
import React from 'react';
import RoomStatus from './components/RoomStatus';
import Building from './components/Building';

const Home = () => {
  return (
    <div className="flex justify-center">
      {/* 헤더 */}

      <div className="mt-[10px] flex w-[370px] flex-col gap-[20px]">
        <div>
          <Building buildingName="공학관" />
          <div className="mt-[10px] flex w-full flex-col gap-[10px]">
            <RoomStatus roomName="과방1" lockStatus="잠금"></RoomStatus>
            <RoomStatus roomName="과방2" lockStatus="잠금"></RoomStatus>
          </div>
        </div>

        <div>
          <Building buildingName="신공학관" />
          <div className="mt-[10px] flex w-full flex-col gap-[10px]">
            <RoomStatus roomName="1013호" lockStatus="잠금"></RoomStatus>
            <RoomStatus roomName="1014호" lockStatus="잠금"></RoomStatus>
          </div>
        </div>

        <div>
          <Building buildingName="새천년관" />
          <div className="mt-[10px] flex w-full flex-col gap-[10px]">
            <RoomStatus roomName="501호" lockStatus="잠금"></RoomStatus>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
