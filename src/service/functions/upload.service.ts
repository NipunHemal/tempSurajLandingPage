import { UploadImageParams } from '@/types/api-upload-types';
import axiosClient from '../axios.client';
import { ENDPOINTS } from '../endpoints';

export const uploadImage = async ({ image, type }: UploadImageParams) => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await axiosClient.post(
    `${ENDPOINTS.upload.image}?type=${type}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};
