import axiosClient from "../axios.client";
import { ENDPOINTS } from "../endpoints";
import {
  LiveSessionResponse,
  MyLiveSessionResponse,
  LiveSessionFilterParams,
} from "@/types/live-session.types";
import { SingleApiResponse } from "@/types/api-class-types";
import { LiveSession } from "@/types/live-session.types";

export const getAllLiveSessions = async (
  params?: LiveSessionFilterParams
): Promise<LiveSessionResponse> => {
  const queryParams = new URLSearchParams();
  if (params) {
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
  }

  const queryString = queryParams.toString();
  const url = `${ENDPOINTS.liveSessions.getAll}${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await axiosClient.get(url);
  return response.data;
};

export const getLiveSessionById = async (
  id: string
): Promise<SingleApiResponse<LiveSession>> => {
  const response = await axiosClient.get(ENDPOINTS.liveSessions.getById(id));
  return response.data;
};

export const getMyLiveSessionsByClass = async (
  classId: string
): Promise<MyLiveSessionResponse> => {
  const response = await axiosClient.get(
    ENDPOINTS.liveSessions.getMySessions(classId)
  );
  return response.data;
};
