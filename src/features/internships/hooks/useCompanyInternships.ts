import { useQuery } from "@tanstack/react-query";

import { internshipService } from "../services/internshipService";

export function useCompanyInternships(ownerId: string) {
  return useQuery({
    queryKey: ["company-internships", ownerId],

    queryFn: () => internshipService.getCompanyInternships(ownerId),

    enabled: !!ownerId,
  });
}
