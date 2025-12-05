import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollInClass } from '../functions/enrollment.service';
import { toast } from 'sonner';

export const useEnrollInClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollInClass,
    onSuccess: (response, variables) => {
      toast.success(response.message || 'Enrolled successfully!');
      queryClient.invalidateQueries({
        queryKey: ['class', variables.classId],
      });
       queryClient.invalidateQueries({
        queryKey: ['classes'],
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Enrollment failed. Please try again.'
      );
    },
  });
};
