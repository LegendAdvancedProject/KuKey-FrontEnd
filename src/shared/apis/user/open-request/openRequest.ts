import apiClient from '../../apiClient';
import { API } from '../../urls';

export const requestSpaceOpen = async (spaceId: number) => {
  const response = await apiClient.patch(API.OPEN_REQUEST.REQUEST_SPACE_OPEN(spaceId));
  return response.data;
};
