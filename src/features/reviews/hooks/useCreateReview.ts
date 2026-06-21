import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { reviewService } from "../services/reviewService";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewService.createReview,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "reviews",
          variables.companyId,
        ],
      });
    },
  });
}