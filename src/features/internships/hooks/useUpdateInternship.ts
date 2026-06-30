import { useMutation, useQueryClient } from "@tanstack/react-query";

import { internshipService } from "../services/internshipService";

export function useUpdateInternship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: object }) =>
      internshipService.updateInternship(id, data),

    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["internships"] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["company-internships"] }); } catch {}
    },
  });
}
