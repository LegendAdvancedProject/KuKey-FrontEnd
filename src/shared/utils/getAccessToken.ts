import { ADMIN_ACCESS_TOKEN, USER_ACCESS_TOKEN } from '../constants/storageKey';

export const getAuthToken = () =>
  localStorage.getItem(ADMIN_ACCESS_TOKEN) ?? localStorage.getItem(USER_ACCESS_TOKEN);
