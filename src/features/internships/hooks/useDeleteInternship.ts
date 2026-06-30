import { useMutation, useQueryClient } from "@tanstack/react-query";

import { internshipService } from "../services/internshipService";

export function useDeleteInternship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: internshipService.deleteInternship,

    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["internships"] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["company-internships"] }); } catch {}
    },
  });
}
