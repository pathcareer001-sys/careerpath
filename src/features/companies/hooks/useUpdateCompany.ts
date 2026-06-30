import { useMutation, useQueryClient } from "@tanstack/react-query";

import { companyService } from "../services/companyService";

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: object }) =>
      companyService.updateCompany(id, data),

    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["companies"] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["my-company"] }); } catch {}
    },
  });
}
