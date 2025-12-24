export interface CreatePaymentData {
  classId: string;
  amount: number;
  slipPictureUploadId: string;
  paymentMonth: string;
  currency?: string;
  method?: "BANK_SLIP" | "ONLINE" | "FREE_CARD";
}
