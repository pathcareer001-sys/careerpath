import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applicationService } from "../services/applicationService";

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      applicationService.updateApplicationStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });
}
