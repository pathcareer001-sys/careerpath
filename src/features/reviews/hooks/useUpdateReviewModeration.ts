import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "../services/reviewService";
import type { Review } from "@/types/review";

export function useUpdateReviewModeration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, moderationStatus }: { id: string; moderationStatus: Review["moderationStatus"] }) =>
      reviewService.updateReviewModeration(id, moderationStatus),
    onSuccess: () => {
      try { queryClient.invalidateQueries({ queryKey: ["all-reviews"] }); } catch {}
    },
  });
}
