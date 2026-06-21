import { useQuery } from "@tanstack/react-query";

import { companyService } from "../services/companyService";

export function useMyCompany(ownerId: string) {
  return useQuery({
    queryKey: ["my-company", ownerId],

    queryFn: () => companyService.getCompanyByOwnerId(ownerId),

    enabled: !!ownerId,
  });
}
