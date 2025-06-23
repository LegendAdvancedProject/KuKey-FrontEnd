import apiClient from '../../apiClient';
import { API } from '../../urls';

export type ReservationResponse = {
  status: string;
  message: string;
  data: {
    reservationList: ReservationItem[];
  };
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

export const reserveSpace = async (
  spaceId: number,
  reservationDate: string,
  reservationStartTime: string,
  reservationEndTime: string,
  studentNumber: string,
  studentName: string,
  studentGroup: string,
  reservationPurpose: string
) => {
  const requestBody = {
    reservationDate: reservationDate,
    reservationStartTime: reservationStartTime,
    reservationEndTime: reservationEndTime,
    studentNumber: studentNumber,
    studentName: studentName,
    studentGroup: studentGroup,
    reservationPurpose: reservationPurpose,
  };

  const response = await apiClient.post(API.RESERVE.RESERVE_SPACE(spaceId), requestBody);
  return response.data;
};

export type ReservationHistoryResponse = {
  status: string;
  message: string;
  code: number;
  data: ReservationHistoryData;
};

export type ReservationHistoryData = {
  studentNumber: string;
  studentName: string;
  reservationList: ReservationDetail[];
};

export type ReservationDetail = {
  spaceId: number;
  buildingName: string;
  spaceDisplayName: string;
  reservationId: number;
  reservationDate: string;
  reservationStartTime: string;
  reservationEndTime: string;
  studentGroup: string;
  reservationPurpose: string;
};

export const reserveHistory = async (studentId: number, name: string) => {
  const response = await apiClient.get(API.RESERVE.RESERVE_HISTORY, {
    params: {
      studentNumber: studentId,
      studentName: name,
    },
  });
  return response.data;
};
