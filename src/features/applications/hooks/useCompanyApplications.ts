import { useQuery } from "@tanstack/react-query";

import { applicationService } from "../services/applicationService";

export function useCompanyApplications(companyId: string) {
  return useQuery({
    queryKey: ["company-applications", companyId],

    queryFn: () => applicationService.getCompanyApplications(companyId),

    enabled: !!companyId,
  });
}
