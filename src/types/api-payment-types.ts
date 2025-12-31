export interface CreatePaymentData {
  classId: string;
  amount: number;
  slipPictureUploadId: string;
  paymentMonth: string;
  currency?: string;
  method?: "BANK_SLIP" | "ONLINE" | "FREE_CARD";
}

export interface PaymentFilters {
  status?: "PENDING" | "COMPLETED" | "REJECTED" | "";
  page?: number;
  limit?: number;
  month?: string | null;
  paymentMethod?: string;
  studentId?: string | null;
  classId?: string | null;
  search?: string;
}

export interface PaymentStudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  authUser: {
    email: string;
  };
}

export interface PaymentClass {
  id: string;
  name: string;
  price: string;
}

export interface Payment {
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
  studentProfile: PaymentStudentProfile;
  class: PaymentClass;
}

export interface PaymentPagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface GetPaymentsResponse {
  success: boolean;
  message: string;
  data: {
    payments: Payment[];
    pagination: PaymentPagination;
  };
}
