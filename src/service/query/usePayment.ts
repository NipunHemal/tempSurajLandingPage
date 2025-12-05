import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPayment } from '../functions/payment.service';
import { toast } from 'sonner';

interface MutationCallbacks {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useCreatePayment = (callbacks?: MutationCallbacks) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPayment,
    onSuccess: (response) => {
      toast.success(response.message || 'Payment submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['class'] });
      callbacks?.onSuccess?.();
    },
    onError: (error: any) => {
      console.error('Payment submission failed:', error);
      toast.error(
        error?.response?.data?.message ||
          'Payment submission failed. Please try again.'
      );
      callbacks?.onError?.(error);
    },
  });
};
