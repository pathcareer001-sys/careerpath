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
      queryClient.invalidateQueries({
        queryKey: ["internship-applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["company-applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
}
