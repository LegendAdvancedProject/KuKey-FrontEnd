import { ACCESS_TOKEN } from '../constants/storageKey';

export const getAccessToken = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN) ?? '';
  return accessToken;
};
