// features/applications/hooks/useInternshipApplications.ts

import { useQuery } from "@tanstack/react-query";

import { applicationService } from "../services/applicationService";

export function useInternshipApplications(internshipId: string) {
  return useQuery({
    queryKey: ["internship-applications", internshipId],

    enabled: !!internshipId,

    queryFn: () => applicationService.getInternshipApplications(internshipId),
  });
}
