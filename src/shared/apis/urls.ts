export const API = {
  AUTH: {
    REQUEST_AUTH_CODE: '/auth/code',
    VERIFY_AUTH_CODE: '/auth/verification',
    REMEMBER_AUTH_INFO: '/auth/memory',
    ADMIN_LOGIN: '/auth/login',
  },
  OPEN_REQUEST: {
    REQUEST_SPACE_OPEN: (spaceId: number) => `/open-requests/${spaceId}`,
  },
  SPACES: {
    FETCH_SPACE_OPEN_STATUS: '/spaces/open',
    FETCH_SPACE_RESERVATION_STATUS: '/spaces/reservation',
  },
};
