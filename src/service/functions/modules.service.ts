import { SingleApiResponse } from "@/types/api-class-types";
import axiosClient from "../axios.client";
import { ENDPOINTS } from "../endpoints";

export interface ModuleResource {
  id: string;
  title: string;
  description: string;
  url: string | null;
  type: "VIDEO" | "DOCUMENT" | "LINK";
  status: "ACTIVE" | "INACTIVE";
  moduleId: string;
  month: string;
  subModule: string;
  releaseDate: string;
  expiresDate: string | null;
  paymentStatus: string;
}

export interface GetModuleResourcesResponse {
  success: boolean;
  data: ModuleResource[];
  message: string;
}

export const getModuleResources = async (
  moduleId: string
): Promise<GetModuleResourcesResponse> => {
  const response = await axiosClient.get(ENDPOINTS.modules.resources(moduleId));
  return response.data;
};

export interface Module {
  id: string;
  name: string;
  description: string;
  image: string;
  classId: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export const getModuleById = async (
  moduleId: string
): Promise<SingleApiResponse<Module>> => {
  const response = await axiosClient.get(ENDPOINTS.modules.getById(moduleId));
  return response.data;
};

// Get resources by class and month
export const getResourcesByClassAndMonth = async (
  classId: string,
  month: string
): Promise<GetModuleResourcesResponse> => {
  const response = await axiosClient.get(
    ENDPOINTS.resources.getByClassAndMonth(classId, month)
  );
  return response.data;
};
