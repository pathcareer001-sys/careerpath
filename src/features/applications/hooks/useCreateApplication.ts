import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applicationService } from "../services/applicationService";

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationService.createApplication,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hasApplied"],
      });

      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });
}
