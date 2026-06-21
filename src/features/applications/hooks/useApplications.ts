import { useQuery } from "@tanstack/react-query";

import { applicationService } from "../services/applicationService";

export function useApplications(userId: string) {
  return useQuery({
    queryKey: ["applications", userId],

    queryFn: () => applicationService.getApplications(userId),

    enabled: !!userId,
  });
}
