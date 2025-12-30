import { useQuery } from "@tanstack/react-query";
import {
  getAllLiveSessions,
  getMyLiveSessionsByClass,
  getLiveSessionById,
} from "../functions/live-session.service";
import { LiveSessionFilterParams } from "@/types/live-session.types";

export const LIVE_SESSION_KEYS = {
  all: ["live-sessions"] as const,
  list: (params: LiveSessionFilterParams) =>
    [...LIVE_SESSION_KEYS.all, "list", params] as const,
  detail: (id: string) => [...LIVE_SESSION_KEYS.all, "detail", id] as const,
  mySessions: (classId: string) =>
    [...LIVE_SESSION_KEYS.all, "my-sessions", classId] as const,
};

// Hook to get all sessions (e.g., for the dashboard list)
// Polls every minute to keep statuses updated
export const useGetLiveSessions = (
  params: LiveSessionFilterParams = { page: 1, limit: 10 }
) => {
  return useQuery({
    queryKey: LIVE_SESSION_KEYS.list(params),
    queryFn: () => getAllLiveSessions(params),
    refetchInterval: 60000, // Poll every minute
  });
};

export const useGetLiveSessionById = (id: string) => {
  return useQuery({
    queryKey: LIVE_SESSION_KEYS.detail(id),
    queryFn: () => getLiveSessionById(id),
    enabled: !!id,
  });
};

// Hook specifically for polling "LIVE" status for global alerts
// We might fetch a smaller list or just reuse the main list
export const usePollLiveSessions = () => {
  return useQuery({
    queryKey: LIVE_SESSION_KEYS.list({ limit: 50 }), // Fetch enough to catch recent/live ones
    queryFn: () => getAllLiveSessions({ limit: 50 }),
    refetchInterval: 30000, // Check every 30 seconds for alerts
    staleTime: 10000,
  });
};

export const useGetMyLiveSessions = (classId: string) => {
  return useQuery({
    queryKey: LIVE_SESSION_KEYS.mySessions(classId),
    queryFn: () => getMyLiveSessionsByClass(classId),
    enabled: !!classId,
  });
};
