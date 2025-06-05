import apiClient from '../apiClient';

export interface KeyUploadRequest {
  buildingName: string;
  adminName: string;
  imageUrl: string;
  description: string;
}

export interface KeyUploadResponse {
  buildingName: string;
  keyLocationId: number;
}

export interface KeyLocationInfo {
  keyLocationId: number;
  buildingName: string;
  adminName: string;
  imageUrl: string;
  description: string;
}

// 이미지 업로드
export const uploadKeyImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await apiClient.post<{ data: string }>('/admin/key/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

// 카드키 등록
export const uploadKeyInfo = async (info: KeyUploadRequest): Promise<KeyUploadResponse> => {
  const response = await apiClient.post<{ data: KeyUploadResponse }>('/admin/key/upload', info);
  return response.data.data;
};

// 건물별 카드키 조회
export const fetchKeyInfo = async (buildingName: string): Promise<KeyLocationInfo> => {
  const response = await apiClient.get<{ data: KeyLocationInfo }>(
    `/admin/key?buildingName=${encodeURIComponent(buildingName)}`
  );
  return response.data.data;
};
