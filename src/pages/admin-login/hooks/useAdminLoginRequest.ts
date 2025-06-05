import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminLogin } from '../../../shared/apis/admin/admin-login';
import { ADMIN_ACCESS_TOKEN } from '../../../shared/constants/storageKey';

export const useAdminLoginRequest = () => {
  const queryClient = useQueryClient();

  const { mutate: adminLoginMutation } = useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) => {
      return adminLogin(id, password);
    },
    onSuccess: (response) => {
      if (response.data.code === 200) {
        const authHeader = response.headers['authorization'] || response.headers['Authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const accessToken = authHeader.split(' ')[1];
          localStorage.setItem(ADMIN_ACCESS_TOKEN, accessToken);

          queryClient.invalidateQueries({ queryKey: ['adminLogin'] });
          alert('관리자 로그인 성공');
        } else {
          alert('관리자 토큰 등록 실패');
        }
      } else {
        alert('관리자 토큰 등록 응답 오류');
      }
    },
  });

  return { adminLoginMutation };
};
