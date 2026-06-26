import { useQuery } from "@tanstack/react-query";

import { reviewService } from "../services/reviewService";

export function useAllReviews() {
  return useQuery({
    queryKey: ["all-reviews"],

    queryFn: () => reviewService.getAllReviews(),
  });
}
