// 개방조회 탭
import { useQuery } from '@tanstack/react-query';
import {
  fetchSpaceOpenStatus,
  FetchSpaceOpenStatusResponse,
} from '../../shared/apis/user/spaces/spaces';
import Building from './components/Building';
import SpaceStatus from './components/SpaceStatus';

const Home = () => {
  const { data: currentSpaceStatus, isLoading } = useQuery<FetchSpaceOpenStatusResponse>({
    queryKey: ['spaceOpenStatus'],
    queryFn: fetchSpaceOpenStatus,
  });


  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      <div className="flex justify-center mx-[16px] mt-[13px]">
        <div className="flex w-full flex-col">
          {currentSpaceStatus?.spaceList.map((space, index) => (
            <div key={space.spaceId} className="flex w-full flex-col">
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
        </div>
      </div>
    </div>
  );
};

export default Home;
