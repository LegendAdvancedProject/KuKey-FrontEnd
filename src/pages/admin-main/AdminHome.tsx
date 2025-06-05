import SpaceStatus from './components/SpaceStatus';
import Building from './components/Building';
import { useAdminSpaceManage } from './hooks/useAdminSpaceManage';

const AdminHome = () => {
  const { currentSpaceStatus, isLoading } = useAdminSpaceManage();

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col items-center">
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
      </div>
    </div>
  );
};

export default AdminHome;
