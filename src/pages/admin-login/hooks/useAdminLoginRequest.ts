import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminLogin } from '../../../shared/apis/admin/auth/admin-login';
import { ADMIN_ACCESS_TOKEN } from '../../../shared/constants/storageKey';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export const useAdminLoginRequest = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: adminLoginMutation } = useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) => {
      return adminLogin(id, password);
    },
    onSuccess: (data) => {
      if (data.code === 200) {
        localStorage.setItem(ADMIN_ACCESS_TOKEN, data.data.accessToken);
        queryClient.invalidateQueries({ queryKey: ['adminLogin'] });
        navigate('/admin');
      } else {
        setIsModalOpen(true);
      }
    },
  });

  return { isModalOpen, setIsModalOpen, adminLoginMutation };
};
