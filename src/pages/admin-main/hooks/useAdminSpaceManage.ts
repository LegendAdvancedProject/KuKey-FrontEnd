import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchAdminSpaceOpenStatus,
  FetchAdminSpaceOpenStatusResponse,
  openSpace,
} from '../../../shared/apis/admin/spaces/spaces';

export const useAdminSpaceManage = () => {
  const { data: currentSpaceStatus, isLoading } = useQuery<FetchAdminSpaceOpenStatusResponse>({
    queryKey: ['openSpace'],
    queryFn: fetchAdminSpaceOpenStatus,
  });

  const queryClient = useQueryClient();
  const { mutate: openSpaceMutation } = useMutation({
    mutationFn: (spaceId: number) => openSpace(spaceId),
    onSuccess: (data) => {
      if (data.code == 200) {
        console.log('개방 상태 변경 성공');
        queryClient.invalidateQueries({ queryKey: ['openSpace'] });
        alert('개방 상태 변경 성공');
        // 여기서 openSpaceMutation요청이 'openSpace'라는 쿼리키를 invalidate하므로,
        // currentSpaceStatus라는 GET요청이 다시 요청됨
        // 반대로, currentSpaceStatus는 그냥 GET요청이고, queryClient.invalidateQueries()도 없으니까
        // 이게 실행된다고 openSpaceMutation이 실행되지는 않음
      } else {
        alert('개방 상태 변경 실패');
      }
    },
  });

  return { openSpaceMutation, currentSpaceStatus, isLoading };
};
