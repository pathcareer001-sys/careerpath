import { useQuery } from "@tanstack/react-query";

import { internshipService } from "../services/internshipService";

export function useCompanyInternshipsByCompanyId(companyId: string) {
  return useQuery({
    queryKey: ["company-internships-by-company", companyId],

    queryFn: () => internshipService.getInternshipsByCompanyId(companyId),

    enabled: !!companyId,
  });
}
