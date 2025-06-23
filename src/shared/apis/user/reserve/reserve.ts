import apiClient from '../../apiClient';
import { API } from '../../urls';

export type ReservationResponse = {
  reservationList: ReservationItem[];
};

export type ReservationItem = {
  spaceId: number;
  buildingName: string;
  spaceDisplayName: string;
  unavailableReservationTimeList: ReservationTime[];
};

export type ReservationTime = {
  startTime: string; // "HH:mm" 형식
  endTime: string; // "HH:mm" 형식
};

export const fetchSpaceReserveStatus = async (date: string) => {
  const response = await apiClient.get(API.RESERVE.FETCH_SPACE_RESERVATION_STATUS, {
    params: {
      Date: date,
    },
  });
  console.log(response.data.data);
  return response.data;
};
