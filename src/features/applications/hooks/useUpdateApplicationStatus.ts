import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applicationService } from "../services/applicationService";

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      interviewDate,
      interviewLocation,
    }: {
      id: string;
      status: string;
      interviewDate?: string;
      interviewLocation?: string;
    }) =>
      applicationService.updateApplicationStatus(
        id,
        status,
        interviewDate,
        interviewLocation,
      ),

    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["internship-applications"] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["company-applications"] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["applications"] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["dashboard"] }); } catch {}
    },
  });
}
