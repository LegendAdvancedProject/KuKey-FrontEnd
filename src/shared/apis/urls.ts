export const API = {
  AUTH: {
    REQUEST_AUTH_CODE: '/auth/code',
    VERIFY_AUTH_CODE: 'auth/verification',
    REMEMBER_AUTH_INFO: 'auth/memory',
    ADMIN_LOGIN: 'auth/login',
  },
  SPACE: {
    REQUEST_SPACE_OPEN: (spaceId: number) => `/open-requests/${spaceId}`,
  },
};
