import { useMutation, useQueryClient } from "@tanstack/react-query";

import { internshipService } from "../services/internshipService";

export function useUpdateInternship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: object }) =>
      internshipService.updateInternship(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["internships"],
      });
    },
  });
}
