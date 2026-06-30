import { useMutation, useQueryClient } from "@tanstack/react-query";

import { companyService } from "../services/companyService";

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.createCompany,

    onSuccess: (_, variables) => {
      try { queryClient.invalidateQueries({ queryKey: ["companies"] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["my-company", variables.ownerId] }); } catch {}
    },
  });
}
