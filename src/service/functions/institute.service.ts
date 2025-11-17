import { GetAllInstitutesParams } from "@/types/api-institute-types";
import axiosClient from "../axios.client";
import { ENDPOINTS } from "../endpoints";

export const getAllInstitutes = async (params: GetAllInstitutesParams) => {
  const response = await axiosClient.get(ENDPOINTS.institutes.getAll, { params });
  return response.data;
};
