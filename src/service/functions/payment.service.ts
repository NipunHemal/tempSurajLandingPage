import {
  CreatePaymentData,
  GetPaymentsResponse,
  PaymentFilters,
} from "@/types/api-payment-types";
import axiosClient from "../axios.client";
import { ENDPOINTS } from "../endpoints";

export const createPayment = async (paymentData: CreatePaymentData) => {
  const response = await axiosClient.post(
    ENDPOINTS.payments.create,
    paymentData
  );
  return response.data;
};

export interface PaymentHistory {
  id: string;
  studentId: string;
  classId: string;
  amount: number;
  currency: string;
  method: string;
  transactionRef: string;
  slipPicture: string | null;
  paymentMonth: string;
  status: "PENDING" | "COMPLETED" | "REJECTED";
  paymentDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetPaymentHistoryResponse {
  success: boolean;
  message: string;
  data: PaymentHistory[];
}

export const getPaymentHistory = async (
  studentId: string,
  classId: string
): Promise<GetPaymentHistoryResponse> => {
  const response = await axiosClient.get(
    ENDPOINTS.payments.history(studentId, classId)
  );
  return response.data;
};

export const getPayments = async (
  filters: PaymentFilters
): Promise<GetPaymentsResponse> => {
  const params = new URLSearchParams();

  if (filters.status) params.append("status", filters.status);
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.month) params.append("month", filters.month);
  if (filters.paymentMethod)
    params.append("paymentMethod", filters.paymentMethod);
  if (filters.studentId) params.append("studentId", filters.studentId);
  if (filters.classId) params.append("classId", filters.classId);
  if (filters.search) params.append("search", filters.search);

  const response = await axiosClient.get(
    `${ENDPOINTS.payments.getAll}?${params.toString()}`
  );
  return response.data;
};
