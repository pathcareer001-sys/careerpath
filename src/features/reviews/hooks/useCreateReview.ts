import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { reviewService } from "../services/reviewService";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewService.createReview,

    onSuccess: (_, variables) => {
      try { queryClient.invalidateQueries({ queryKey: ["reviews", variables.companyId] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["companies"] }); } catch {}
      try { queryClient.invalidateQueries({ queryKey: ["company", variables.companyId] }); } catch {}

      reviewService.updateCompanyRating(variables.companyId).catch(() => {});
    },
  });
}
