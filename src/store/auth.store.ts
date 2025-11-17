
import { UserProfileData } from "@/types/api-auth-types";
import { create } from "zustand";

interface AuthState {
  user: UserProfileData | null;
  isLoading: boolean;
  setUser: (user: UserProfileData | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));
