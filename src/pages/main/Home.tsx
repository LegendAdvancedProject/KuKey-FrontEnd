// 개방조회 탭
import { useQuery } from '@tanstack/react-query';
import {
  fetchSpaceOpenStatus,
  FetchSpaceOpenStatusResponse,
} from '../../shared/apis/spaces/spaces';
import Building from './components/Building';
import SpaceStatus from './components/SpaceStatus';

const Home = () => {
  const { data: currentSpaceStatus, isLoading } = useQuery<FetchSpaceOpenStatusResponse>({
    queryKey: ['spaceOpenStatus'],
    queryFn: fetchSpaceOpenStatus,
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex justify-center">
      {/* 헤더 */}

      <div className="flex w-[370px] flex-col">
        {currentSpaceStatus?.spaceList.map((space, index) => (
          <div key={space.spaceId} className="mt-[10px] flex w-full flex-col gap-[10px]">
            {(index === 0 || index === 2 || index === 4) && (
              <Building buildingName={space.buildingName} />
            )}
            <SpaceStatus
              spaceName={space.spaceDisplayName}
              openStatus={space.openStatus}
              spaceId={space.spaceId}
              requestOrReservedStatus={space.RequestOrReservationStatus}
            />
          </div>
        ))}

        {/* <div>
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
        </div> */}
      </div>
    </div>
  );
};

export default Home;
