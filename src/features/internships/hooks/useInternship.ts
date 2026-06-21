import { useQuery } from "@tanstack/react-query";

import { internshipService } from "../services/internshipService";

export function useInternship(id: string) {
  return useQuery({
    queryKey: ["internship", id],

    queryFn: () => internshipService.getInternshipById(id),

    enabled: !!id,
  });
}
