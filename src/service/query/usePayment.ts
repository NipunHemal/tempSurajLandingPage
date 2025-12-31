import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPayment,
  getPaymentHistory,
  getPayments,
} from "../functions/payment.service";
import { toast } from "sonner";
import { PaymentFilters } from "@/types/api-payment-types";

interface MutationCallbacks {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useCreatePayment = (callbacks?: MutationCallbacks) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPayment,
    onSuccess: (response) => {
      toast.success(response.message || "Payment submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["class"] });
      queryClient.invalidateQueries({ queryKey: ["paymentHistory"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      callbacks?.onSuccess?.();
    },
    onError: (error: any) => {
      console.error("Payment submission failed:", error);
      toast.error(
        error?.response?.data?.message ||
          "Payment submission failed. Please try again."
      );
      callbacks?.onError?.(error);
    },
  });
};

export const useGetPaymentHistory = (
  studentId: string | undefined,
  classId: string | undefined
) => {
  return useQuery({
    queryKey: ["paymentHistory", studentId, classId],
    queryFn: () => getPaymentHistory(studentId!, classId!),
    enabled: !!studentId && !!classId,
  });
};

export const useGetPayments = (filters: PaymentFilters) => {
  return useQuery({
    queryKey: ["payments", filters],
    queryFn: () => getPayments(filters),
  });
};
