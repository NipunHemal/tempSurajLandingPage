import {
  Announcement,
  AnnouncementFilterParams,
  AnnouncementResponse,
} from "@/types/announcement.types";
import axiosClient from "../axios.client";
import { ENDPOINTS } from "../endpoints";
import { SingleApiResponse } from "@/types/api-class-types";

export const getAnnouncements = async (
  params?: AnnouncementFilterParams
): Promise<AnnouncementResponse> => {
  const queryParams = new URLSearchParams();

  if (params) {
    if (params.type) queryParams.append("type", params.type);
    if (params.status) queryParams.append("status", params.status);
    if (params.priority) queryParams.append("priority", params.priority);
    if (params.severity) queryParams.append("severity", params.severity);
    if (params.displayType)
      queryParams.append("displayType", params.displayType);
    if (params.search) queryParams.append("search", params.search);
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
  }

  const queryString = queryParams.toString();
  const url = `${ENDPOINTS.announcements.getAll}${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await axiosClient.get(url);
  return response.data;
};

export const markAnnouncementAsViewed = async (
  id: string
): Promise<
  SingleApiResponse<{
    announcementId: string;
    viewedAt: string;
    isFirstView: boolean;
  }>
> => {
  const response = await axiosClient.post(
    ENDPOINTS.announcements.markViewed(id)
  );
  return response.data;
};
