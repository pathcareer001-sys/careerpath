import { useQuery } from "@tanstack/react-query";

import { applicationService } from "../services/applicationService";

export function useAllApplications() {
  return useQuery({
    queryKey: ["applications"],

    queryFn: () => applicationService.getAllApplications(),
  });
}
