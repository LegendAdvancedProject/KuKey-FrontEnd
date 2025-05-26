// 개방조회 탭
import React from 'react';
import RoomStatus from './components/SpaceStatus';
import Building from './components/Building';
import SpaceStatus from './components/SpaceStatus';

const Home = () => {
  return (
    <div className="flex justify-center">
      {/* 헤더 */}

      <div className="mt-[10px] flex w-[370px] flex-col gap-[20px]">
        <div>
          <Building buildingName="공학관" />
          <div className="mt-[10px] flex w-full flex-col gap-[10px]">
            <SpaceStatus spaceName="과방1" lockStatus="잠금" spaceId={1}></SpaceStatus>
            <SpaceStatus spaceName="과방2" lockStatus="잠금" spaceId={2}></SpaceStatus>
          </div>
        </div>

        <div>
          <Building buildingName="신공학관" />
          <div className="mt-[10px] flex w-full flex-col gap-[10px]">
            <SpaceStatus spaceName="1013호" lockStatus="잠금" spaceId={3}></SpaceStatus>
            <SpaceStatus spaceName="1014호" lockStatus="잠금" spaceId={4}></SpaceStatus>
          </div>
        </div>

        <div>
          <Building buildingName="새천년관" />
          <div className="mt-[10px] flex w-full flex-col gap-[10px]">
            <SpaceStatus spaceName="501호" lockStatus="잠금" spaceId={5}></SpaceStatus>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
