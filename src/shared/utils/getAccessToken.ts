import { USER_ACCESS_TOKEN } from '../constants/storageKey';

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(USER_ACCESS_TOKEN) ?? '';
  return accessToken;
};
