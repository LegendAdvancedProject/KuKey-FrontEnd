export const API = {
  AUTH: {
    REQUEST_AUTH_CODE: '/auth/code',
    VERIFY_AUTH_CODE: 'auth/verification',
    SAVE_AUTH_INFO: 'auth/memory',
    ADMIN_LOGIN: 'auth/login',
  },
  OPEN_REQUEST: {
    REQUEST_SPACE_OPEN: (spaceId: number) => `/open-requests/${spaceId}`,
  },
  SPACES: {
    FETCH_SPACE_OPEN_STATUS: '/spaces/open',
  },
  ADMIN: {
    FETCH_SPACE_OPEN_STATUS: '/admin/spaces',
    OPEN_SPACE: (spaceId: number) => `/admin/open-change/${spaceId}`,
  },
  RESERVE: {
    FETCH_SPACE_RESERVATION_STATUS: '/spaces/reservation',
    RESERVE_SPACE: (spaceId: number) => `/reservations/${spaceId}`,
    RESERVE_HISTORY: '/reservations',
  },
};
