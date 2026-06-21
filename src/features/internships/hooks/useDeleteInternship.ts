import { useMutation, useQueryClient } from "@tanstack/react-query";

import { internshipService } from "../services/internshipService";

export function useDeleteInternship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: internshipService.deleteInternship,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["internships"],
      });

      queryClient.invalidateQueries({
        queryKey: ["company-internships"],
      });
    },
  });
}
