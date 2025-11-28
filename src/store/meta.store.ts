import { MetaData } from '@/types/api-meta-types';
import { create } from 'zustand';

interface MetaState {
  meta: MetaData | null;
  isLoading: boolean;
  setMeta: (meta: MetaData | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useMetaStore = create<MetaState>((set) => ({
  meta: null,
  isLoading: true,
  setMeta: (meta) => set({ meta }),
  setLoading: (isLoading) => set({ isLoading }),
}));
