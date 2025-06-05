import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminLogin } from '../../../shared/apis/admin/admin-login';
import { ADMIN_ACCESS_TOKEN } from '../../../shared/constants/storageKey';

export const useAdminLoginRequest = () => {
  const queryClient = useQueryClient();

  const { mutate: adminLoginMutation } = useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) => {
      return adminLogin(id, password);
    },
    onSuccess: (data) => {
      if (data.code === 200) {
        
          localStorage.setItem(ADMIN_ACCESS_TOKEN, data.data.accessToken);
          queryClient.invalidateQueries({ queryKey: ['adminLogin'] });
      } else {
        alert('관리자 토큰 등록 응답 오류');
      }
    },
  });

  return { adminLoginMutation };
};
