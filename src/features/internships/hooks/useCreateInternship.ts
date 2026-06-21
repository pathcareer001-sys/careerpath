import { useMutation, useQueryClient } from "@tanstack/react-query";

import { internshipService } from "../services/internshipService";

export function useCreateInternship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: internshipService.createInternship,

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
