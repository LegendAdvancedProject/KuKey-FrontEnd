import apiClient from '../apiClient';
import { API } from '../urls';

export const requestAuthCode = async (userEmail: string) => {
  const requestBody = {
    email: userEmail,
  };

  const response = await apiClient.post(API.AUTH.REQUEST_AUTH_CODE, requestBody);
  return response.data;
};

export const verifyAuthCode = async (userEmail: string, code: number) => {
  const requestBody = {
    email: userEmail,
    code: code,
  };

  const response = await apiClient.post(API.AUTH.VERIFY_AUTH_CODE, requestBody);
  return response.data;
};

export const saveAuthInfo = async (userEmail: string) => {
  const requestBody = {
    email: userEmail,
  };

  const response = await apiClient.post(API.AUTH.SAVE_AUTH_INFO, requestBody);
  return response.data;
};
