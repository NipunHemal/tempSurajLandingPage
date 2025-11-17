export interface Institute {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  type: 'ONLINE' | 'PHYSICAL';
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

export interface InstitutesResponse {
  success: boolean;
  data: Institute[];
  pagination: Pagination;
}

export interface GetAllInstitutesParams {
    page?: number;
    limit?: number;
}
