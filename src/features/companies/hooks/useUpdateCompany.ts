import { useMutation, useQueryClient } from "@tanstack/react-query";

import { companyService } from "../services/companyService";

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      companyService.updateCompany(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });
}
