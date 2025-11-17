import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignInstitute, updateStudentProfile } from '../functions/student.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface MutationCallbacks {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useUpdateStudentProfile = (callbacks?: MutationCallbacks) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: (response) => {
      toast.success(response.message || 'Profile updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      callbacks?.onSuccess?.();
    },
    onError: (error: any) => {
      console.error('Profile update failed:', error);
      toast.error(
        error?.response?.data?.message ||
          'Profile update failed. Please try again.'
      );
      callbacks?.onError?.(error);
    },
  });
};

export const useAssignInstitute = (callbacks?: MutationCallbacks) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignInstitute,
    onSuccess: (response) => {
      toast.success(response.message || 'Institute assigned successfully!');
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      callbacks?.onSuccess?.();
      router.push('/dashboard');
    },
    onError: (error: any) => {
      console.error('Institute assignment failed:', error);
      toast.error(
        error?.response?.data?.message ||
          'Failed to assign institute. Please try again.'
      );
      callbacks?.onError?.(error);
    },
  });
};
