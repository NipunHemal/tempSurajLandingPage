import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAnnouncements,
  markAnnouncementAsViewed,
} from "../functions/announcement.service";
import { AnnouncementFilterParams } from "@/types/announcement.types";

export const ANNOUNCEMENT_KEYS = {
  all: ["announcements"] as const,
  list: (filters: AnnouncementFilterParams) =>
    [...ANNOUNCEMENT_KEYS.all, "list", filters] as const,
};

export const useGetAnnouncements = (params?: AnnouncementFilterParams) => {
  return useQuery({
    queryKey: params ? ANNOUNCEMENT_KEYS.list(params) : ANNOUNCEMENT_KEYS.all,
    queryFn: () => getAnnouncements(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useMarkAnnouncementViewed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markAnnouncementAsViewed(id),
    onSuccess: () => {
      // Invalidate announcements to reflect viewed status if needed
      queryClient.invalidateQueries({ queryKey: ANNOUNCEMENT_KEYS.all });
    },
  });
};
