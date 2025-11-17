'use client';

import { useQuery } from "@tanstack/react-query";
import { getAllInstitutes } from "../functions/institute.service";
import { InstitutesResponse } from "@/types/api-institute-types";

export const useGetInstitutes = () => {
  return useQuery<InstitutesResponse>({
    queryKey: ["institutes"],
    queryFn: () => getAllInstitutes({ page: 1, limit: 50 }), // Fetching up to 50 institutes
  });
};
