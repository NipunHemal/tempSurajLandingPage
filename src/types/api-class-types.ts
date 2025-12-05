
export interface Class {
  id: string;
  instituteId: string;
  name: string;
  description: string;
  subDescription: string;
  image: string;
  year: number;
  price: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  enrollmentStatus?: 'ENROLLED' | 'NOT_ENROLLED';
}

export interface Module {
  id: string;
  classId: string;
  name: string;
  description: string;
  image: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
}

export interface SingleApiResponse<T> {
  success: boolean;
  data: T;
}

export interface GetAllClassesParams {
  page?: number;
  limit?: number;
  search?: string;
  enrollmentStatus?: 'ENROLLED' | 'NOT_ENROLLED';
}

export interface GetModulesByClassIdParams {
  page?: number;
  limit?: number;
  classId: string;
  search?: string;
}
