import apiClient from '../apiClient';
import { API } from '../urls';
import { OpenStatus, RequestOrReservationStatus } from '../../constants/spaceStatus';

export type SpaceInfo = {
  spaceId: number;
  buildingName: string;
  spaceDisplayName: string;
  openStatus: OpenStatus;
  RequestOrReservationStatus: RequestOrReservationStatus;
};

export type FetchSpaceOpenStatusResponse = {
  spaceList: SpaceInfo[];
};

export const fetchSpaceOpenStatus = async () => {
  const response = await apiClient.get(API.SPACES.FETCH_SPACE_OPEN_STATUS);
  return response.data.data;
};
