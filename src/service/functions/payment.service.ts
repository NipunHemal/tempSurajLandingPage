import { CreatePaymentData } from "@/types/api-payment-types";
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
