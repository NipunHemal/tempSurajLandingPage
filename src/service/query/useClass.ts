'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getAllClasses,
  getModulesByClassId,
} from '../functions/class.service';
import type { ApiResponse, Class, GetAllClassesParams, GetModulesByClassIdParams, Module } from '@/types/api-class-types';

export const useGetClasses = (params: GetAllClassesParams) => {
  return useQuery<ApiResponse<Class>>({
    queryKey: ['classes', params],
    queryFn: () => getAllClasses(params),
  });
};

export const useGetModulesByClass = (params: GetModulesByClassIdParams) => {
  return useQuery<ApiResponse<Module>>({
    queryKey: ['modules', params],
    queryFn: () => getModulesByClassId(params),
    enabled: !!params.classId,
  });
};
