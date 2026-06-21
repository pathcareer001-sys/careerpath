import { useQuery } from "@tanstack/react-query";

import { reviewService } from "../services/reviewService";

export function useReviews(
  companyId: string
) {
  return useQuery({
    queryKey: [
      "reviews",
      companyId,
    ],

    queryFn: () =>
      reviewService.getCompanyReviews(
        companyId
      ),

    enabled: !!companyId,
  });
}