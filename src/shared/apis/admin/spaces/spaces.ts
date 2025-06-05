import apiClient from '../../apiClient';
import { API } from '../../urls';
import { OpenStatus, RequestOrReservationStatus } from '../../../constants/spaceStatus';

export type SpaceInfo = {
  spaceId: number;
  buildingName: string;
  spaceDisplayName: string;
  openStatus: OpenStatus;
  RequestOrReservationStatus: RequestOrReservationStatus;
};

export type FetchAdminSpaceOpenStatusResponse = {
  spaceList: SpaceInfo[];
};

// 잠금/개방 상태 조회
export const fetchAdminSpaceOpenStatus = async () => {
  const response = await apiClient.get(API.ADMIN.FETCH_SPACE_OPEN_STATUS);
  return response.data.data;
};

// 잠금/개방 상태 변경
export const openSpace = async (spaceId: number) => {
  const response = await apiClient.patch(API.ADMIN.OPEN_SPACE(spaceId));
  return response.data;
};
