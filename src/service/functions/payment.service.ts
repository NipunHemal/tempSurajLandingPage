import { CreatePaymentData } from '@/types/api-payment-types';
import axiosClient from '../axios.client';
import { ENDPOINTS } from '../endpoints';

export const createPayment = async (paymentData: CreatePaymentData) => {
  const response = await axiosClient.post(ENDPOINTS.payments.create, paymentData);
  return response.data;
};
