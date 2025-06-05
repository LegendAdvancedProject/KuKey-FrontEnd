import SpaceStatus from './components/SpaceStatus';
import Building from './components/Building';
import { useAdminSpaceManage } from './hooks/useAdminSpaceManage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ADMIN_ACCESS_TOKEN } from '../../shared/constants/storageKey';
import { useNavigate } from 'react-router';

const AdminHome = () => {
  const { currentSpaceStatus, isLoading } = useAdminSpaceManage();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(ADMIN_ACCESS_TOKEN);
    navigate('/');
    alert('관리자 로그아웃');
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col items-center">
      {/* 헤더 */}
      <span className="text-[30px] font-[700] text-cyan-500">관리자</span>

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

      <button type="button" className="absolute right-5 bottom-5" onClick={handleLogout}>
        <FontAwesomeIcon icon="user-tie" size="3x" />
      </button>
    </div>
  );
};

export default AdminHome;
