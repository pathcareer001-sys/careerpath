import { useMutation, useQueryClient } from "@tanstack/react-query";

import { companyService } from "../services/companyService";

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companyService.deleteCompany,

    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["companies"] }); } catch {}
    },
  });
}
