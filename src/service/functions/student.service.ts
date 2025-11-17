import { AssignInstituteData, UpdateStudentProfileData } from '@/types/api-student-types';
import axiosClient from '../axios.client';
import { ENDPOINTS } from '../endpoints';

export const updateStudentProfile = async (
  profileData: UpdateStudentProfileData
) => {
  const response = await axiosClient.put(
    ENDPOINTS.students.profile,
    profileData
  );
  return response.data;
};

export const assignInstitute = async (data: AssignInstituteData) => {
  const response = await axiosClient.post(
    ENDPOINTS.students.assignInstitute,
    data
  );
  return response.data;
}
