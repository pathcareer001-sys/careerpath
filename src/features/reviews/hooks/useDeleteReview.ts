import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reviewService } from "../services/reviewService";

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reviewService.deleteReview(id),

    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["reviews"] }); } catch {}
    },
  });
}
