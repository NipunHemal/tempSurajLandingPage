import { useQuery } from '@tanstack/react-query';
import { getMeta } from '../functions/meta.service';
import { MetaResponse } from '@/types/api-meta-types';

export const useGetMeta = () => {
  return useQuery<MetaResponse>({
    queryKey: ['meta'],
    queryFn: getMeta,
    staleTime: Infinity, // This data is not expected to change often
    refetchOnWindowFocus: false,
  });
};
