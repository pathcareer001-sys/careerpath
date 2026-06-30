import { useMutation, useQueryClient } from "@tanstack/react-query";

import { internshipService } from "../services/internshipService";

export function useCreateInternship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: internshipService.createInternship,

    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["internships"] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["company-internships"] }); } catch {}
    },
  });
}
