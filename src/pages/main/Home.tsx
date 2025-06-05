// 개방조회 탭
import { useQuery } from '@tanstack/react-query';
import {
  fetchSpaceOpenStatus,
  FetchSpaceOpenStatusResponse,
} from '../../shared/apis/user/spaces/spaces';
import Building from './components/Building';
import SpaceStatus from './components/SpaceStatus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router';

const Home = () => {
  const { data: currentSpaceStatus, isLoading } = useQuery<FetchSpaceOpenStatusResponse>({
    queryKey: ['spaceOpenStatus'],
    queryFn: fetchSpaceOpenStatus,
  });

  const navigate = useNavigate();
  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
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
        </div>
      </div>

      <button type="button" className="absolute right-5 bottom-5" onClick={handleAdminClick}>
        <FontAwesomeIcon icon="user-tie" size="3x" />
      </button>
    </div>
  );
};

export default Home;
