import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applicationService } from "../services/applicationService";

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationService.createApplication,

    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["hasApplied"] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["applications"] }); } catch {}
    },
  });
}
