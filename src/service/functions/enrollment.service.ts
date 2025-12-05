import type { EnrollInClassParams } from '@/types/api-enrollment-types';
import axiosClient from '../axios.client';
import { ENDPOINTS } from '../endpoints';

export const enrollInClass = async ({ classId }: EnrollInClassParams) => {
  const response = await axiosClient.post(
    `${ENDPOINTS.enrollments.enroll}?classId=${classId}`
  );
  return response.data;
};
