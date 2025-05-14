import apiClient from '../apiClient';
import { API } from '../../constants/urls';

export const requestAuthCode = async (userEmail: string) => {
  const requestBody = {
    email: userEmail,
  };

  const response = await apiClient.post(API.AUTH.REQUEST_AUTH_CODE, requestBody);
  return response.data;
};
