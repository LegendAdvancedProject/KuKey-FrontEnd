import Building from './components/Building';
import { useAdminSpaceManage } from './hooks/useAdminSpaceManage';
import CustomModal from '../../shared/components/CustomModal';
import AdminSpaceStatus from './components/AdminSpaceStatus';

const AdminHome = () => {
  const {
    isModalOpen,
    modalContent,
    modalCloseHandler,
    modalConfirmHandler,
    showCancelButton,
    currentSpaceStatus,
    isLoading,
    openSpaceMutation,
  } = useAdminSpaceManage();

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex justify-center mx-[16px] mt-[13px]">
        <div className="flex w-full flex-col">
        {currentSpaceStatus?.spaceList.map((space, index) => (
          <div key={space.spaceId} className="flex w-full flex-col">
            {(index === 0 || index === 2 || index === 4) && (
              <Building buildingName={space.buildingName} />
            )}
            <AdminSpaceStatus
              spaceName={space.spaceDisplayName}
              openStatus={space.openStatus}
              spaceId={space.spaceId}
              requestOrReservedStatus={space.RequestOrReservationStatus}
              openSpaceMutation={() => openSpaceMutation(space.spaceId)}
            />
          </div>
        ))}
      </div>

      <CustomModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={modalCloseHandler}
        onConfirm={modalConfirmHandler}
        showCancelButton={showCancelButton}
      />
    </div>
  );
};

export default AdminHome;
