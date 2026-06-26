import { useQuery } from "@tanstack/react-query";

import { applicationService } from "../services/applicationService";

export function useHasApplied(internshipId: string, applicantId: string) {
  return useQuery({
    queryKey: ["hasApplied", internshipId, applicantId],

    queryFn: () => applicationService.hasApplied(internshipId, applicantId),

    enabled: !!internshipId && !!applicantId,
  });
}
