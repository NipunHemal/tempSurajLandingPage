import { useQuery } from "@tanstack/react-query";
import {
  getModuleResources,
  GetModuleResourcesResponse,
  getModuleById,
  Module,
  getResourcesByClassAndMonth,
} from "../functions/modules.service";
import { SingleApiResponse } from "@/types/api-class-types";

export const useGetModuleResources = (moduleId: string) => {
  return useQuery<GetModuleResourcesResponse, Error>({
    queryKey: ["module-resources", moduleId],
    queryFn: () => getModuleResources(moduleId),
    enabled: !!moduleId,
  });
};

export const useGetModuleById = (moduleId: string) => {
  return useQuery<SingleApiResponse<Module>, Error>({
    queryKey: ["module", moduleId],
    queryFn: () => getModuleById(moduleId),
    enabled: !!moduleId,
  });
};

export const useGetResourcesByClassAndMonth = (
  classId: string,
  month: string | null
) => {
  return useQuery<GetModuleResourcesResponse, Error>({
    queryKey: ["class-resources", classId, month],
    queryFn: () => getResourcesByClassAndMonth(classId, month!),
    enabled: !!classId && !!month,
  });
};
