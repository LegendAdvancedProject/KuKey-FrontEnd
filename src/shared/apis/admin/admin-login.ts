import apiClient from '../apiClient';
import { API } from '../urls';

export const adminLogin = async (id: string, password: string) => {
  const requestBody = {
    id: id,
    password: password,
  };

  const response = await apiClient.post(API.AUTH.ADMIN_LOGIN, requestBody);
  return response;
};
