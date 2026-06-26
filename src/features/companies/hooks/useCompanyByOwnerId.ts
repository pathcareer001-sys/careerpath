// src/features/companies/hooks/useCompanyByOwnerId.ts

import { useQuery } from "@tanstack/react-query";

import { companyService } from "../services/companyService";

export function useCompanyByOwnerId(ownerId: string) {
  return useQuery({
    queryKey: ["company", ownerId],

    enabled: !!ownerId,

    queryFn: () => companyService.getCompanyByOwnerId(ownerId),
  });
}
