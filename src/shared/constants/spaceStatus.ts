// 값으로 쓸 때는 OPEN_STATUS.OPEN과 같이 가져올 수 있음
export const OPEN_STATUS = {
  OPEN: 'OPEN',
  LOCKED: 'LOCKED',
} as const;

// 타입으로 쓸 때는 const status: OpenStatus = 'OPEN'과 같이 사용 가능
export type OpenStatus = (typeof OPEN_STATUS)[keyof typeof OPEN_STATUS];

export const REQUEST_OR_RESERVATION_STATUS = {
  NONE: 'NONE',
  REQUESTED: 'REQUESTED',
  ING: 'ING',
} as const;

export type RequestOrReservationStatus = typeof REQUEST_OR_RESERVATION_STATUS;
