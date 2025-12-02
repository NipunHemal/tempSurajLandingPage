
'use client';

import type {
  ApiResponse,
  Class,
  GetAllClassesParams,
  GetModulesByClassIdParams,
  Module,
  SingleApiResponse,
} from '@/types/api-class-types';
import axiosClient from '../axios.client';
import { ENDPOINTS } from '../endpoints';

export const getAllClasses = async (
  params: GetAllClassesParams
): Promise<ApiResponse<Class>> => {
  const response = await axiosClient.get(ENDPOINTS.classes.getAll, { params });
  return response.data;
};

export const getClassById = async (
  id: string
): Promise<SingleApiResponse<Class>> => {
  const response = await axiosClient.get(`${ENDPOINTS.classes.getById}/${id}`);
  return response.data;
};

export const getModulesByClassId = async (
  params: GetModulesByClassIdParams
): Promise<ApiResponse<Module>> => {
  const response = await axiosClient.get(ENDPOINTS.modules.getByClass, {
    params,
  });
  return response.data;
};
